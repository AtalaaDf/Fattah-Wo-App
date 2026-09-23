import React from 'react'
import { Power } from 'lucide-react'
import Card from '../../../../../components/ui/Card'

export const AvailabilityStatusSection = ({ isAvailable, onToggleAvailability }) => (
  <Card className={`border-2 transition-colors ${isAvailable ? 'border-emerald-300 bg-emerald-50/50' : 'border-slate-300 bg-slate-100/50'}`}>
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-xl text-white ${isAvailable ? 'bg-emerald-600' : 'bg-slate-500'}`}>
          <Power className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            Status Ketersediaan Kerja:
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
              {isAvailable ? 'ON (Siap Ambil Job)' : 'OFF (Sedang Libur / Tidak Tersedia)'}
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Ubah status ini ke ON ketika Anda siap bertugas atau OFF jika sedang berhalangan/libur. Admin dapat melihat status ketersediaan Anda di sistem.
          </p>
        </div>
      </div>

      <label className="relative inline-flex items-center cursor-pointer shrink-0">
        <input
          type="checkbox"
          checked={!!isAvailable}
          onChange={(e) => onToggleAvailability(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
      </label>
    </div>
  </Card>
)

export default AvailabilityStatusSection
