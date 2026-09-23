import React from 'react'
import { Package } from 'lucide-react'

export const SelectedBundleSection = ({ selectedBundle }) => {
  if (!selectedBundle) return null

  return (
    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
          <Package className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-amber-800 font-semibold uppercase">Paket Dipilih:</p>
          <h4 className="font-bold text-amber-900">{selectedBundle.name}</h4>
        </div>
      </div>
      <p className="text-lg font-extrabold text-amber-900">
        Rp {Number(selectedBundle.price).toLocaleString('id-ID')}
      </p>
    </div>
  )
}

export default SelectedBundleSection
