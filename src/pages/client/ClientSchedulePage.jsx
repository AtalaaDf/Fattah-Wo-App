import React from 'react'

export const ClientSchedulePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">Status Acara Saya</h1>
        <p className="text-sm text-slate-muted">Pantau status konfirmasi & daftar kru teralokasikan</p>
      </div>

      <div className="bg-white border border-outline-variant rounded-lg p-6 text-sm text-slate-500 text-center">
        Status reservasi milik client ini akan tampil di sini.
      </div>
    </div>
  )
}

export default ClientSchedulePage
