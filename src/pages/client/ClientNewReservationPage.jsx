import React from 'react'

export const ClientNewReservationPage = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">Form Reservasi Baru</h1>
        <p className="text-sm text-slate-muted">Isi rincian tanggal, tipe acara, dan kebutuhan kru pernikahan</p>
      </div>

      <div className="bg-white border border-outline-variant rounded-lg p-6 text-sm text-slate-500 text-center">
        Form reservasi client (React Hook Form + Zod validation) akan dibangun di tahap berikutnya.
      </div>
    </div>
  )
}

export default ClientNewReservationPage
