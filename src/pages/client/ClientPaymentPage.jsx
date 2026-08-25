import React from 'react'
import { useParams } from 'react-router-dom'

export const ClientPaymentPage = () => {
  const { reservationId } = useParams()

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">Halaman Pembayaran</h1>
        <p className="text-sm text-slate-muted">Reservasi ID: {reservationId}</p>
      </div>

      <div className="bg-white border border-outline-variant rounded-lg p-6 text-sm text-slate-500 text-center">
        Pilihan pembayaran (Pay Now / Tunda Payment dengan popup kalender) akan dibuat di tahap berikutnya.
      </div>
    </div>
  )
}

export default ClientPaymentPage
