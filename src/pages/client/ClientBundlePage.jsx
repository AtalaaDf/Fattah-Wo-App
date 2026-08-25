import React from 'react'

export const ClientBundlePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">Browse Bundle Paket</h1>
        <p className="text-sm text-slate-muted">Eksplorasi paket layanan pernikahan Fattah Wedding Organizer</p>
      </div>

      <div className="bg-white border border-outline-variant rounded-lg p-6 text-sm text-slate-500 text-center">
        Daftar bundle aktif (read-only) untuk calon client akan tampil di sini.
      </div>
    </div>
  )
}

export default ClientBundlePage
