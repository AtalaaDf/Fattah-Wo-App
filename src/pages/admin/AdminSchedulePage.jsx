import React from 'react'

export const AdminSchedulePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-heading font-bold text-primary">Schedule Master</h1>
          <p className="text-sm text-slate-muted">Kelola alokasi kru & status konfirmasi event</p>
        </div>
        <div className="flex bg-surface-container rounded-md p-1 border border-outline-variant text-xs">
          <button className="px-3 py-1 bg-white font-semibold rounded shadow-sm">List View</button>
          <button className="px-3 py-1 font-medium text-slate-600">Calendar View</button>
        </div>
      </div>

      <div className="bg-white border border-outline-variant rounded-lg p-6 text-sm text-slate-500 text-center">
        Daftar event & penugasan kru akan ditampilkan di sini.
      </div>
    </div>
  )
}

export default AdminSchedulePage
