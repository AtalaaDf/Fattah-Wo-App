import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

import { loginSchema } from '../schemas/authSchemas'
import { useLoginMutation } from '../hooks/useAuthHooks'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState(null)

  const { mutate: login, isPending } = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  const onSubmit = (data) => {
    setAuthError(null)
    login(data, {
      onError: (err) => {
        setAuthError(err.message || 'Login gagal. Periksa kembali email/username dan password Anda.')
      },
    })
  }

  return (
    <div className="w-full space-y-5">
      {/* Error Banner */}
      {authError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{authError}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email atau Username"
          placeholder="Username"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.identifier?.message}
          required
          {...register('identifier')}
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          }
          error={errors.password?.message}
          required
          {...register('password')}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full mt-2 font-bold"
          isLoading={isPending}
        >
          {isPending ? 'Masuk...' : 'Masuk ke Akun'}
        </Button>
      </form>

      {/* Helper hint */}
      <p className="text-center text-[11px] text-slate-400 leading-relaxed">
        Gunakan <span className="font-semibold text-slate-500">email</span> untuk akun client atau admin,
        dan <span className="font-semibold text-slate-500">username</span> untuk akun worker.
      </p>
    </div>
  )
}

export default LoginForm
