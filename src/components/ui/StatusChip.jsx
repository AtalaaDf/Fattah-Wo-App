import React from 'react'

export const StatusChip = ({ status, label, className = '' }) => {
  const statusStyles = {
    // Reservation / Job status
    confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending_staffing: 'bg-amber-50 text-amber-700 border-amber-200',
    completed: 'bg-blue-50 text-blue-700 border-blue-200',
    cancelled: 'bg-rose-50 text-rose-700 border-rose-200',

    // Payment status
    paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dp_paid: 'bg-amber-50 text-amber-700 border-amber-200',
    unpaid: 'bg-rose-50 text-rose-700 border-rose-200',

    // Worker profile status
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    inactive: 'bg-slate-100 text-slate-600 border-slate-300',
    cancel_requested: 'bg-purple-50 text-purple-700 border-purple-200',

    // Role badge
    admin: 'bg-primary/10 text-primary border-primary/20',
    worker: 'bg-champagne-gold/10 text-champagne-gold border-champagne-gold/30',
    client: 'bg-slate-100 text-slate-700 border-slate-300',
  }

  const defaultLabels = {
    confirmed: 'Confirmed',
    pending_staffing: 'Pending Staffing',
    completed: 'Completed',
    cancelled: 'Cancelled',
    paid: 'Lunas',
    dp_paid: 'DP Paid',
    unpaid: 'Unpaid',
    active: 'Aktif',
    inactive: 'Nonaktif',
    cancel_requested: 'Cancel Requested',
    admin: 'Admin',
    worker: 'Worker',
    client: 'Client',
  }

  const normalizedStatus = (status || '').toLowerCase()
  const style = statusStyles[normalizedStatus] || 'bg-slate-100 text-slate-600 border-slate-200'
  const displayLabel = label || defaultLabels[normalizedStatus] || status

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border font-sans select-none ${style} ${className}`}
    >
      {displayLabel}
    </span>
  )
}

export default StatusChip
