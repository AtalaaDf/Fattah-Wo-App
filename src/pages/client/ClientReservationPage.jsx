import React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

export const ClientReservationPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">Reservasi Saya</h1>
        <p className="text-sm text-slate-muted">Kelola reservasi wedding & penugasan tim Fattah WO</p>
      </div>

      {/* Empty State with big '+' button per AGENT.md specification */}
      <div className="bg-white border border-outline-variant rounded-lg p-12 flex flex-col items-center justify-center text-center space-y-4">
        <Link
          to="/client/reservation/new"
          className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary-container transition-transform hover:scale-105"
          title="Buat Reservasi Baru"
        >
          <Plus className="w-8 h-8" />
        </Link>
        <div>
          <h3 className="font-heading font-semibold text-base text-primary">Belum Ada Reservasi</h3>
          <p className="text-xs text-slate-muted max-w-sm mt-1">
            Klik tombol '+' di atas untuk mulai membuat reservasi jadwal pernikahan Anda.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ClientReservationPage
