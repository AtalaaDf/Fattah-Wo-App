import React from 'react'

export const AdminBundlePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary">Kelola Bundle</h1>
          <p className="text-sm text-slate-muted">Atur paket pernikahan & penawaran di landing page</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary-container transition-colors">
          + Tambah Bundle
        </button>
      </div>

      <div className="bg-white border border-outline-variant rounded-lg p-6 text-sm text-slate-500 text-center">
        Daftar bundle & fitur paket akan ditampilkan di sini.
      </div>
    </div>
  )
}

export default AdminBundlePage
