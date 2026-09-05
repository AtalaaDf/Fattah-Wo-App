import React from 'react'
import Logo from '../../components/common/Logo'
import RegisterForm from '../../features/auth/components/RegisterForm'

export const RegisterPage = () => {
  return (
    <div className="max-w-md mx-auto my-12 p-6 md:p-8 bg-white border border-outline-variant rounded-xl shadow-xs text-center space-y-6">
      <div className="flex flex-col items-center">
        <Logo variant="full" theme="light" />
      </div>

      <RegisterForm />
    </div>
  )
}

export default RegisterPage
