import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import Button from '../../../../../components/ui/Button'
import Modal from '../../../../../components/ui/Modal'

export const UploadConfirmationModal = ({ isOpen, onClose, onNavigate }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Bukti Pembayaran Terkirim"
    maxWidth="max-w-md"
  >
    <div className="space-y-4 text-center">
      <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600" />
      <div>
        <p className="font-bold text-slate-900">Bukti pembayaran berhasil dikirim.</p>
        <p className="text-sm text-slate-500 mt-1">
          Admin akan memeriksa bukti transfer dan memperbarui status pembayaran Anda.
        </p>
      </div>
      <Button
        type="button"
        onClick={onNavigate}
        leftIcon={<CheckCircle2 className="w-4 h-4" />}
        className="w-full"
      >
        Kembali ke Reservasi Saya
      </Button>
    </div>
  </Modal>
)

export default UploadConfirmationModal
