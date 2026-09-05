import React, { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Calendar, Clock } from 'lucide-react';

export const PostponePaymentModal = ({ isOpen, onClose, onConfirmPostpone, isSubmitting }) => {
  const [dpDueDate, setDpDueDate] = useState('');
  const [fullDueDate, setFullDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onConfirmPostpone({ dpDueDate, fullDueDate });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Atur Tanggal Tunda Pembayaran" maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs text-slate-500">
          Tentukan batas tanggal janji bayar untuk Uang Muka (DP) dan Pelunasan Penuh acara Anda.
        </p>

        <Input
          label="Tanggal Batas Pelunasan DP"
          type="date"
          icon={<Calendar className="w-4 h-4" />}
          value={dpDueDate}
          onChange={(e) => setDpDueDate(e.target.value)}
          required
        />

        <Input
          label="Tanggal Batas Pelunasan Penuh (Full Payment)"
          type="date"
          icon={<Calendar className="w-4 h-4" />}
          value={fullDueDate}
          onChange={(e) => setFullDueDate(e.target.value)}
          required
        />

        <div className="p-3 bg-amber-50 rounded-lg text-xs text-amber-800 flex items-start gap-2">
          <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            Jadwal penundaan akan dicatat di sistem agar tim Admin Fattah WO dapat mengonfirmasi jadwal Anda.
          </span>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            Simpan Tanggal Tunda
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PostponePaymentModal;
