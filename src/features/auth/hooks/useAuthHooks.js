import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuthStore } from '../../../store/useAuthStore'
import {
  signInWithEmail,
  signInWorker,
  signUpClient,
  signOutUser,
} from '../../../lib/supabase/queries/auth'


export const useLoginMutation = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: async ({ identifier, password }) => {
      try {
        return await signInWithEmail(identifier, password)
      } catch (emailErr) {
        if (!identifier.includes('@')) {
          return await signInWorker(identifier, password)
        }
        throw emailErr
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
      return await signUpClient(payload)
    },
    onSuccess: (data) => {
      if (data?.user && data?.profile) {
        setAuth(data.user, data.profile)
        toast.success('Akun berhasil dibuat! Selamat datang di Fattah WO.')
        navigate('/client/reservation')
      }
    },
    onError: (err) => {
      toast.error(err.message || 'Registrasi gagal. Silakan coba lagi.')
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
