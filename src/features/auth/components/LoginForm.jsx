import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, ShieldAlert, UserCheck, Briefcase } from 'lucide-react'

import { loginSchema } from '../schemas/authSchemas'
import { useLoginMutation } from '../hooks/useAuthHooks'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'

export const LoginForm = () => {
  const [selectedRole, setSelectedRole] = useState('client')
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState(null)

  const { mutate: login, isPending } = useLoginMutation()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: 'client',
      identifier: '',
      password: '',
    },
  })

  const handleRoleChange = (role) => {
    setSelectedRole(role)
    setValue('role', role)
    setValue('identifier', '')
    setAuthError(null)
  }

  const onSubmit = (data) => {
    setAuthError(null)
    login(
      { ...data, role: selectedRole },
      {
        onError: (err) => {
          setAuthError(err.message || 'Login gagal. Periksa kembali kredensial Anda.')
        },
      }
    )
  }

  const handleDemoLogin = (role) => {
    setAuthError(null)
    login({ role, isDemo: true })
  }

  return (
    <div className="w-full space-y-6">
      {/* Role Selection Tabs */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-sans text-center">
          Pilih Akses Role
        </label>
        <div className="grid grid-cols-3 gap-1 p-1 bg-surface-container-low border border-outline-variant rounded-lg">
          <button
            type="button"
            onClick={() => handleRoleChange('client')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-md transition-all font-sans ${
              selectedRole === 'client'
                ? 'bg-white text-primary shadow-xs border border-outline-variant/50 font-bold'
                : 'text-slate-muted hover:text-on-surface'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Client</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange('worker')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-md transition-all font-sans ${
              selectedRole === 'worker'
                ? 'bg-white text-primary shadow-xs border border-outline-variant/50 font-bold'
                : 'text-slate-muted hover:text-on-surface'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Worker</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange('admin')}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-md transition-all font-sans ${
              selectedRole === 'admin'
                ? 'bg-white text-primary shadow-xs border border-outline-variant/50 font-bold'
                : 'text-slate-muted hover:text-on-surface'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {authError && (
        <div className="p-3 bg-error-container/40 border border-error/30 rounded-md flex items-start gap-2.5 text-xs text-error">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{authError}</span>
        </div>
      )}

      {/* Main Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {selectedRole === 'worker' ? (
          <Input
            label="Username Worker"
            placeholder="Masukkan username (contoh: budi_wo)"
            leftIcon={<User className="w-4 h-4" />}
            error={errors.identifier?.message}
            required
            {...register('identifier')}
          />
        ) : (
          <Input
            label={`Email ${selectedRole === 'admin' ? 'Admin' : 'Client'}`}
            type="email"
            placeholder={
              selectedRole === 'admin'
                ? 'admin@fattahwo.com'
                : 'nama@domain.com'
            }
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.identifier?.message}
            required
            {...register('identifier')}
          />
        )}

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-muted hover:text-on-surface focus:outline-none"
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
          variant="primary"
          size="lg"
          className="w-full mt-2 font-bold"
          isLoading={isPending}
        >
          Masuk Sekarang
        </Button>
      </form>

      {/* Quick Demo Login Helpers */}
      <div className="pt-4 border-t border-outline-variant space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-muted text-center font-sans">
          Mode Uji Cepat (Demo Mode):
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleDemoLogin('client')}
            className="py-1.5 px-2 bg-surface hover:bg-surface-container text-primary text-xs font-semibold rounded border border-outline-variant transition-colors"
          >
            Demo Client
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('worker')}
            className="py-1.5 px-2 bg-surface hover:bg-surface-container text-primary text-xs font-semibold rounded border border-outline-variant transition-colors"
          >
            Demo Worker
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('admin')}
            className="py-1.5 px-2 bg-surface hover:bg-surface-container text-primary text-xs font-semibold rounded border border-outline-variant transition-colors"
          >
            Demo Admin
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
