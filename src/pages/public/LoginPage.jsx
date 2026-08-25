import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../components/common/Logo'

export const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white border border-outline-variant rounded-lg shadow-sm">
      <div className="flex flex-col items-center mb-6">
        <Logo variant="full" theme="light" />
        <h2 className="mt-4 text-xl font-heading font-bold text-primary">Login Sistem</h2>
        <p className="text-xs text-slate-muted">Masuk sebagai Admin, Worker, atau Client</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-surface rounded-md border border-outline-variant text-xs text-slate-600 space-y-1">
          <p className="font-semibold text-primary">Akses Cepat (Placeholder Route Map):</p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Link to="/admin/dashboard" className="px-3 py-1 bg-primary text-white rounded font-medium hover:opacity-90">
              Masuk Admin
            </Link>
            <Link to="/worker/dashboard" className="px-3 py-1 bg-deep-teal text-white rounded font-medium hover:opacity-90">
              Masuk Worker
            </Link>
            <Link to="/client/reservation" className="px-3 py-1 bg-champagne-gold text-white rounded font-medium hover:opacity-90">
              Masuk Client
            </Link>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link to="/register" className="text-xs text-primary font-semibold hover:underline">
            Belum punya akun Client? Register di sini
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
