import React from 'react'
import Logo from '../../components/common/Logo'
import LoginForm from '../../features/auth/components/LoginForm'

export const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto my-12 p-6 md:p-8 bg-white border border-outline-variant rounded-xl shadow-xs text-center space-y-6">
      <div className="flex flex-col items-center">
        <Logo variant="full" theme="light" />
        <p className="text-xs text-slate-muted font-sans mt-3">
          Portal Sistem Portal Utama Fattah WO
        </p>
      </div>

      <LoginForm />
    </div>
  )
}

export default LoginPage
