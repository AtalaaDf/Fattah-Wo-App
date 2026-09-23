import React from 'react'

export const BundleMetaSection = ({ register }) => (
  <>
    <input type="hidden" {...register('image_url')} />

    <div className="sm:col-span-2">
      <label className="block text-xs font-semibold text-slate-700 mb-1.5">Deskripsi Singkat</label>
      <textarea
        rows={2}
        placeholder="Jelaskan mengenai paket ini..."
        className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        {...register('description')}
      />
    </div>

    <div className="flex items-center gap-4 sm:col-span-2">
      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
        <input
          type="checkbox"
          className="w-4 h-4 rounded text-primary focus:ring-primary/20"
          {...register('is_popular')}
        />
        Tandai sebagai "Terpopuler"
      </label>

      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
        <input
          type="checkbox"
          className="w-4 h-4 rounded text-primary focus:ring-primary/20"
          {...register('is_active')}
        />
        Status Aktif
      </label>
    </div>
  </>
)

export default BundleMetaSection
