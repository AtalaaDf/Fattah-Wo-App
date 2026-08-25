import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../components/common/Logo'

export const RegisterPage = () => {
  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white border border-outline-variant rounded-lg shadow-sm">
      <div className="flex flex-col items-center mb-6">
        <Logo variant="full" theme="light" />
        <h2 className="mt-4 text-xl font-heading font-bold text-primary">Registrasi Client Baru</h2>
        <p className="text-xs text-slate-muted">Daftar untuk melakukan reservasi wedding organizer</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-surface rounded-md border border-outline-variant text-xs text-slate-600 text-center">
          Form registrasi mandiri client akan dibangun di tahap berikutnya.
        </div>

        <div className="text-center pt-2">
          <Link to="/login" className="text-xs text-primary font-semibold hover:underline">
            Sudah punya akun? Login di sini
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
