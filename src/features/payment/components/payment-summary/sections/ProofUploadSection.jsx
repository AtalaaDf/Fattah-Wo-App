import React from 'react'
import { FileImage, X } from 'lucide-react'

export const ProofUploadSection = ({ selectedFile, filePreview, fileInputRef, onFileChange, onClearSelection }) => (
  <div>
    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
      Langkah 3: Unggah Foto Bukti Pembayaran
    </h4>
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*,application/pdf"
      className="hidden"
      onChange={onFileChange}
    />

    {!selectedFile ? (
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center gap-2 text-slate-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
      >
        <FileImage className="w-8 h-8 text-primary" />
        <span className="text-xs font-bold text-slate-800">Tap di sini untuk memilih foto / screenshot struk transfer</span>
        <span className="text-[11px] text-slate-400">JPG, PNG, PDF (Maksimal 5MB)</span>
      </button>
    ) : (
      <div className="border border-slate-200 rounded-xl p-3 flex items-center gap-3 bg-slate-50">
        {filePreview ? (
          <img src={filePreview} alt="preview" className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0" />
        ) : (
          <div className="w-14 h-14 rounded-lg bg-slate-200 flex items-center justify-center shrink-0">
            <FileImage className="w-6 h-6 text-slate-500" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-800 truncate">{selectedFile.name}</p>
          <p className="text-[11px] text-slate-400">{(selectedFile.size / 1024).toFixed(1)} KB</p>
        </div>
        <button
          type="button"
          onClick={onClearSelection}
          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    )}
  </div>
)

export default ProofUploadSection
