import React from 'react';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

export const PayNowModal = ({ isOpen, onClose, onConfirmPay, totalAmount, paymentType, method, isSubmitting }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Konfirmasi Pembayaran Acara" maxWidth="max-w-md">
      <div className="space-y-4 text-center">
        <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shrink-0">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-slate-900 text-base">Peringatan Ketentuan Pembatalan</h4>
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs font-semibold flex items-start gap-2 text-left">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Jika reservasi ini dibatalkan di kemudian hari, uang yang sudah dibayarkan <strong>tidak dapat dikembalikan (Non-refundable)</strong>.
            </span>
          </div>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-600 text-left space-y-1">
          <p className="flex justify-between">
            <span>Tipe Pembayaran:</span>
            <strong className="text-slate-800 uppercase">{paymentType === 'dp' ? 'Uang Muka (DP 50%)' : 'Pelunasan Penuh (Full)'}</strong>
          </p>
          <p className="flex justify-between">
            <span>Metode:</span>
            <strong className="text-slate-800">{method === 'bank_transfer' ? 'Bank Transfer (BCA/Mandiri)' : 'E-Wallet (GoPay/OVO)'}</strong>
          </p>
          <p className="flex justify-between text-sm pt-1 border-t border-slate-200">
            <span>Total Dibayar:</span>
            <strong className="text-primary font-bold">Rp {Number(totalAmount).toLocaleString('id-ID')}</strong>
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={onConfirmPay} isLoading={isSubmitting}>
            Saya Setuju & Bayar Now
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PayNowModal;
