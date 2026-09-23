import React from 'react'
import { FileImage } from 'lucide-react'

export const ProfilePhotoSection = ({ filePreview, selectedFile, setSelectedFile, setFilePreview, details, fileInputRef, handleFileChange, register }) => (
  <div className="sm:col-span-2 space-y-2">
    <label className="block text-xs font-semibold text-slate-700">Foto Profil Karyawan / Worker</label>
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleFileChange}
    />

    {!filePreview ? (
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center gap-2 text-slate-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
      >
        <FileImage className="w-8 h-8" />
        <span className="text-xs font-medium">Tap untuk pilih foto profil</span>
        <span className="text-[11px] text-slate-400">JPG, PNG maks 2MB (disarankan rasio 1:1)</span>
      </button>
    ) : (
      <div className="border border-slate-200 rounded-xl p-3 flex items-center gap-4 bg-slate-50">
        <img src={filePreview} alt="preview" className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-sm shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-800 truncate">
            {selectedFile ? selectedFile.name : 'Foto Profil Saat Ini'}
          </p>
          {selectedFile && (
            <p className="text-[11px] text-slate-400">{(selectedFile.size / 1024).toFixed(1)} KB</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 transition-colors"
          >
            Ganti Foto
          </button>
          {selectedFile && (
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null)
                setFilePreview(details.profile_photo_url || null)
              }}
              className="text-[11px] font-bold text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors"
            >
              Batal Pilih
            </button>
          )}
        </div>
      </div>
    )}

    <input type="hidden" {...register('profile_photo_url')} />
  </div>
)

export default ProfilePhotoSection
