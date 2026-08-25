import React from 'react'

export const AdminFeedbackPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">Feedback Client</h1>
        <p className="text-sm text-slate-muted">Ulasan & masukan dari client setelah acara selesai</p>
      </div>

      <div className="bg-white border border-outline-variant rounded-lg p-6 text-sm text-slate-500 text-center">
        Daftar ulasan client akan ditampilkan di sini.
      </div>
    </div>
  )
}

export default AdminFeedbackPage
