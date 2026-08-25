import React from 'react'

export const WorkerDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">Dashboard Worker</h1>
        <p className="text-sm text-slate-muted">Ringkasan statistik kerja & jadwal terdekat</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-outline-variant rounded-lg">
          <div className="text-xs font-semibold text-slate-muted uppercase">Event Selesai</div>
          <div className="text-3xl font-heading font-bold text-primary mt-2">0</div>
        </div>
        <div className="p-6 bg-white border border-outline-variant rounded-lg">
          <div className="text-xs font-semibold text-slate-muted uppercase">Jadwal Mendatang</div>
          <div className="text-3xl font-heading font-bold text-primary mt-2">0</div>
        </div>
      </div>
    </div>
  )
}

export default WorkerDashboardPage
