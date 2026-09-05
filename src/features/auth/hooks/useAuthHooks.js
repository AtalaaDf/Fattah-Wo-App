import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../store/useAuthStore'
import {
  signInWithEmail,
  signInWorker,
  signUpClient,
  signOutUser,
} from '../../../lib/supabase/queries/auth'

export const MOCK_USERS = {
  admin: {
    id: 'demo-admin-id',
    email: 'admin@fattahwo.com',
    user_metadata: { role: 'admin' },
  },
  adminProfile: {
    id: 'demo-admin-id',
    role: 'admin',
    full_name: 'Atala (Admin Fattah WO)',
    username: 'admin',
    email: 'admin@fattahwo.com',
    phone: '081234567890',
    is_active: true,
  },
  worker: {
    id: 'demo-worker-id',
    email: 'budi@worker.fattahwo.internal',
    user_metadata: { role: 'worker' },
  },
  workerProfile: {
    id: 'demo-worker-id',
    role: 'worker',
    full_name: 'Budi Santoso',
    username: 'budi_wo',
    email: 'budi@worker.fattahwo.internal',
    phone: '085299887766',
    is_active: true,
  },
  client: {
    id: 'demo-client-id',
    email: 'client@gmail.com',
    user_metadata: { role: 'client' },
  },
  clientProfile: {
    id: 'demo-client-id',
    role: 'client',
    full_name: 'Siti Rahma (Calon Pengantin)',
    username: null,
    email: 'client@gmail.com',
    phone: '081377889900',
    is_active: true,
  },
}

export const useLoginMutation = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: async ({ role, identifier, password, isDemo = false }) => {
      if (isDemo) {
        // Quick demo login mode
        const mockUser = MOCK_USERS[role] || MOCK_USERS.client
        const mockProfile = MOCK_USERS[`${role}Profile`] || MOCK_USERS.clientProfile
        return { user: mockUser, profile: mockProfile }
      }

      if (role === 'worker') {
        return await signInWorker(identifier, password)
      } else {
        return await signInWithEmail(identifier, password)
      }
    },
    onSuccess: (data) => {
      if (data?.user && data?.profile) {
        setAuth(data.user, data.profile)
        const role = data.profile.role
        if (role === 'admin') navigate('/admin/dashboard')
        else if (role === 'worker') navigate('/worker/dashboard')
        else navigate('/client/reservation')
      }
    },
  })
}

export const useRegisterMutation = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: async (payload) => {
      // Check if fallback demo is needed if Supabase is offline
      try {
        return await signUpClient(payload)
      } catch (err) {
        if (err.message.includes('placeholder') || err.message.includes('FetchError') || err.message.includes('Failed to fetch')) {
          const mockUser = { id: `client-${Date.now()}`, email: payload.email }
          const mockProfile = {
            id: mockUser.id,
            role: 'client',
            full_name: payload.full_name,
            email: payload.email,
            phone: payload.phone,
            is_active: true,
          }
          return { user: mockUser, profile: mockProfile }
        }
        throw err
      }
    },
    onSuccess: (data) => {
      if (data?.user && data?.profile) {
        setAuth(data.user, data.profile)
        navigate('/client/reservation')
      }
    },
  })
}

export const useLogoutMutation = () => {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((state) => state.clearAuth)

  return useMutation({
    mutationFn: async () => {
      await signOutUser()
      clearAuth()
    },
    onSuccess: () => {
      navigate('/login')
    },
  })
}
