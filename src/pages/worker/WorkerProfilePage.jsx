import React from 'react'

export const WorkerProfilePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">Biodata & Profil Worker</h1>
        <p className="text-sm text-slate-muted">Lengkapi data diri & kontak aktif untuk keperluan penugasan</p>
      </div>

      <div className="bg-white border border-outline-variant rounded-lg p-6 text-sm text-slate-500 text-center">
        Form biodata worker (data diri & kontak WA) akan diisi worker di tahap berikutnya.
      </div>
    </div>
  )
}

export default WorkerProfilePage
