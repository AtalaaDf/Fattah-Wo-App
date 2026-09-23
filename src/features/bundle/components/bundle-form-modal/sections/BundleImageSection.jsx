import React from 'react'
import { FileImage } from 'lucide-react'

export const BundleImageSection = ({ filePreview, selectedFile, fileInputRef, onChooseFile, onReplace }) => (
  <div className="sm:col-span-2 space-y-2">
    <label className="block text-xs font-semibold text-slate-700">Gambar Cover Paket Bundle</label>
    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onChooseFile} />

    {!filePreview ? (
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full border-2 border-dashed border-slate-300 rounded-xl p-5 flex flex-col items-center gap-2 text-slate-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
      >
        <FileImage className="w-8 h-8 text-primary" />
        <span className="text-xs font-bold text-slate-800">Unggah Gambar Cover Paket (Admin)</span>
        <span className="text-[11px] text-slate-400">JPG, PNG, WebP (Rasio disarankan 16:9 atau 4:3)</span>
      </button>
    ) : (
      <div className="border border-slate-200 rounded-xl p-3 flex items-center gap-3 bg-slate-50">
        <img src={filePreview} alt="preview cover" className="w-20 h-14 object-cover rounded-lg border border-slate-200 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-800 truncate">
            {selectedFile ? selectedFile.name : 'Cover Paket Terpasang'}
          </p>
          {selectedFile && (
            <p className="text-[11px] text-slate-400">{(selectedFile.size / 1024).toFixed(1)} KB</p>
          )}
        </div>
        <button
          type="button"
          onClick={onReplace}
          className="text-xs font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 transition-colors shrink-0"
        >
          Ganti Gambar
        </button>
      </div>
    )}
  </div>
)

export default BundleImageSection
