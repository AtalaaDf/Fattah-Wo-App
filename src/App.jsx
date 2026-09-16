import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import router from './routes/router'
import { supabase } from './lib/supabase/client'
import { fetchProfile } from './lib/supabase/queries/auth'
import { useAuthStore } from './store/useAuthStore'

// Initialize TanStack Query client for server state management (Supabase)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

// Inner component that can access Zustand store hooks
function AuthProvider({ children }) {
  const setAuth = useAuthStore((state) => state.setAuth)
  const setLoading = useAuthStore((state) => state.setLoading)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  useEffect(() => {
    // Subscribe to auth state changes (handles refresh, tab restore, sign-in, sign-out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
          if (session?.user) {
            const profile = await fetchProfile(session.user.id)
            if (profile) {
              setAuth(session.user, profile)
            } else {
              // Profile not ready yet (e.g. trigger delay), retry once
              setTimeout(async () => {
                const retryProfile = await fetchProfile(session.user.id)
                if (retryProfile) setAuth(session.user, retryProfile)
                else setLoading(false)
              }, 1500)
            }
          } else {
            setLoading(false)
          }
        } else if (event === 'SIGNED_OUT') {
          clearAuth()
          queryClient.clear()
        } else {
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [setAuth, setLoading, clearAuth])

  return children
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
