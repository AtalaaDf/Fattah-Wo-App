import React from 'react'
import Card from '../../../../../components/ui/Card'
import StatusChip from '../../../../../components/ui/StatusChip'

export const ReservationSummarySection = ({ reservation, bundle, payment, currentStatus }) => {
  const adminVerifiedAmount = payment?.total_amount
  const estimatedAmount = bundle.price || 0

  return (
    <Card>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div>
          <span className="font-mono text-xs font-bold text-slate-500">{reservation.ref_code}</span>
          <h3 className="text-lg font-bold text-slate-900">{reservation.full_name}</h3>
        </div>
        <StatusChip status={currentStatus} />
      </div>

      <div className="space-y-2 text-xs text-slate-600">
        <p className="flex justify-between">
          <span className="text-slate-400">Acara:</span>
          <span className="font-medium text-slate-800 uppercase">{reservation.reservation_type}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-slate-400">Paket Layanan:</span>
          <span className="font-medium text-slate-800">{bundle.name || 'Custom Package'}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-slate-400">Tanggal Acara:</span>
          <span className="font-medium text-slate-800">
            {new Date(reservation.event_date).toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </p>
        <p className="flex justify-between text-sm pt-2 border-t border-slate-100 font-bold">
          <span className="text-slate-700">Estimasi Tagihan:</span>
          <span className={adminVerifiedAmount ? 'line-through text-slate-400' : 'text-primary'}>
            Rp {Number(estimatedAmount).toLocaleString('id-ID')}
          </span>
        </p>
        {adminVerifiedAmount && (
          <p className="flex justify-between text-sm font-bold">
            <span className="text-slate-700">Total Terverifikasi Admin:</span>
            <span className="text-emerald-600">Rp {Number(adminVerifiedAmount).toLocaleString('id-ID')}</span>
          </p>
        )}
      </div>
    </Card>
  )
}

export default ReservationSummarySection
