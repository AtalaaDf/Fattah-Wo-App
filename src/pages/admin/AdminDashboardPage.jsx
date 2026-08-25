import React from 'react'

export const AdminDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">Dashboard Admin</h1>
        <p className="text-sm text-slate-muted">Overview operasional pernikahan, revenue, dan statistik worker</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-outline-variant rounded-lg">
          <div className="text-xs font-semibold text-slate-muted uppercase">Total Wedding Handled</div>
          <div className="text-3xl font-heading font-bold text-primary mt-2">0</div>
        </div>
        <div className="p-6 bg-white border border-outline-variant rounded-lg">
          <div className="text-xs font-semibold text-slate-muted uppercase">Active Workers</div>
          <div className="text-3xl font-heading font-bold text-primary mt-2">0</div>
        </div>
        <div className="p-6 bg-white border border-outline-variant rounded-lg">
          <div className="text-xs font-semibold text-slate-muted uppercase">Pending Staffing Events</div>
          <div className="text-3xl font-heading font-bold text-primary mt-2">0</div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
