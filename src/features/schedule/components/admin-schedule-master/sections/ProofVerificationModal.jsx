import React from 'react'
import { Image as ImageIcon } from 'lucide-react'
import Button from '../../../../../components/ui/Button'
import Modal from '../../../../../components/ui/Modal'

export const ProofVerificationModal = ({ selectedEventForProof, setSelectedEventForProof, proofSignedUrl, isLoadingProof, isAdminUpdating, handleAdminUpdatePaymentStatus }) => (
  <Modal
    isOpen={!!selectedEventForProof}
    onClose={() => setSelectedEventForProof(null)}
    title="Verifikasi Bukti Foto Pembayaran"
    maxWidth="max-w-lg"
  >
    <div className="space-y-4">
      <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs space-y-1">
        <p className="font-bold text-slate-900">{selectedEventForProof?.full_name}</p>
        <p className="text-slate-500">Ref: {selectedEventForProof?.ref_code}</p>
        <p className="text-slate-700 font-medium">
          Total Tagihan Paket: Rp {Number(selectedEventForProof?.bundles?.price || 5000000).toLocaleString('id-ID')}
        </p>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Foto Struk Bukti Transfer Client:
        </label>
        <div className="h-64 rounded-xl border border-slate-200 bg-slate-100 overflow-hidden flex items-center justify-center">
          {isLoadingProof ? (
            <div className="text-center text-slate-400 p-4">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs font-semibold">Memuat foto...</p>
            </div>
          ) : proofSignedUrl ? (
            <a href={proofSignedUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full block">
              <img
                src={proofSignedUrl}
                alt="Bukti Transfer"
                className="w-full h-full object-contain bg-slate-950 hover:opacity-90 transition-opacity cursor-pointer"
              />
            </a>
          ) : (
            <div className="text-center text-slate-400 p-4">
              <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-xs font-semibold">Client belum mengunggah foto bukti pembayaran</p>
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 space-y-2">
        <label className="block text-xs font-bold text-slate-700">
          Ubah Status Pembayaran (Khusus Admin):
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            disabled={isAdminUpdating}
            onClick={() => handleAdminUpdatePaymentStatus(selectedEventForProof.id, 'unpaid')}
            className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
              selectedEventForProof?.payment_status === 'unpaid'
                ? 'bg-rose-500 text-white border-rose-600'
                : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
            }`}
          >
            Belum Bayar
          </button>
          <button
            type="button"
            disabled={isAdminUpdating}
            onClick={() => handleAdminUpdatePaymentStatus(selectedEventForProof.id, 'dp_paid')}
            className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
              selectedEventForProof?.payment_status === 'dp_paid'
                ? 'bg-amber-500 text-white border-amber-600'
                : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
            }`}
          >
            Bayar DP
          </button>
          <button
            type="button"
            disabled={isAdminUpdating}
            onClick={() => handleAdminUpdatePaymentStatus(selectedEventForProof.id, 'paid')}
            className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
              selectedEventForProof?.payment_status === 'paid'
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            Lunas
          </button>
        </div>
      </div>

      <div className="flex justify-end pt-3">
        <Button variant="outline" onClick={() => setSelectedEventForProof(null)}>
          Tutup
        </Button>
      </div>
    </div>
  </Modal>
)

export default ProofVerificationModal
