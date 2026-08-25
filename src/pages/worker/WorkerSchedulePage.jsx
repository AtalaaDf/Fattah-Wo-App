import React from 'react'

export const WorkerSchedulePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">Jadwal Saya</h1>
        <p className="text-sm text-slate-muted">Daftar event yang sudah Anda ambil dan terkonfirmasi</p>
      </div>

      <div className="bg-white border border-outline-variant rounded-lg p-6 text-sm text-slate-500 text-center">
        Daftar event terambil & tombol "Ajukan Pembatalan ke Admin" akan tampil di sini.
      </div>
    </div>
  )
}

export default WorkerSchedulePage
