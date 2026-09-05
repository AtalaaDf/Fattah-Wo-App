import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { User, Mail, Phone, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

import { clientRegisterSchema } from '../schemas/authSchemas'
import { useRegisterMutation } from '../hooks/useAuthHooks'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [registerError, setRegisterError] = useState(null)

  const { mutate: registerUser, isPending } = useRegisterMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(clientRegisterSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data) => {
    setRegisterError(null)
    registerUser(data, {
      onError: (err) => {
        setRegisterError(err.message || 'Registrasi gagal. Silakan coba lagi.')
      },
    })
  }

  return (
    <div className="w-full space-y-6">
      {/* Header Info */}
      <div className="text-center space-y-1">
        <h3 className="text-lg font-heading font-bold text-primary">Buat Akun Client</h3>
        <p className="text-xs text-slate-muted font-sans">
          Daftar untuk melakukan reservasi dan memilih paket pernikahan impian Anda.
        </p>
      </div>

      {/* Error Alert */}
      {registerError && (
        <div className="p-3 bg-error-container/40 border border-error/30 rounded-md flex items-start gap-2.5 text-xs text-error">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{registerError}</span>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nama Lengkap"
          placeholder="Siti Rahma"
          leftIcon={<User className="w-4 h-4" />}
          error={errors.full_name?.message}
          required
          {...register('full_name')}
        />

        <Input
          label="Email Aktif"
          type="email"
          placeholder="siti.rahma@email.com"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          required
          {...register('email')}
        />

        <Input
          label="Nomor WhatsApp / Telepon"
          placeholder="081234567890"
          leftIcon={<Phone className="w-4 h-4" />}
          error={errors.phone?.message}
          required
          {...register('phone')}
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Minimal 6 karakter"
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

        <Input
          label="Konfirmasi Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Ulangi password Anda"
          leftIcon={<Lock className="w-4 h-4" />}
          error={errors.confirmPassword?.message}
          required
          {...register('confirmPassword')}
        />

        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="w-full mt-2 font-bold"
          isLoading={isPending}
        >
          Daftar Sekarang
        </Button>
      </form>

      {/* Login Navigation Link */}
      <div className="text-center pt-2 text-xs text-slate-muted font-sans">
        Sudah memiliki akun?{' '}
        <Link to="/login" className="text-primary font-semibold hover:underline">
          Masuk di sini
        </Link>
      </div>
    </div>
  )
}

export default RegisterForm
