import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { Loader2 } from 'lucide-react'

export const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { isAuthenticated, profile, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm font-sans text-slate-muted">Memverifikasi sesi...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !profile) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(profile.role)) {
    // Redirect to proper role portal if role doesn't match
    if (profile.role === 'admin') return <Navigate to="/admin/dashboard" replace />
    if (profile.role === 'worker') return <Navigate to="/worker/dashboard" replace />
    return <Navigate to="/client/reservation" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
