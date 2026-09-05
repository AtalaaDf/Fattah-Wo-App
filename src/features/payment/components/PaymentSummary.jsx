import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import StatusChip from '../../../components/ui/StatusChip';
import { Image, Landmark, Wallet, Calendar, Clock, Upload, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import PostponePaymentModal from './PostponePaymentModal';

export const PaymentSummary = ({ reservation, payment, onSubmitProof, onPostpone, isSubmittingProof, isPostponing }) => {
  const [paymentType, setPaymentType] = useState('full'); // 'dp' | 'full'
  const [method, setMethod] = useState('bank_transfer'); // 'bank_transfer' | 'e_wallet'
  const [proofUrl, setProofUrl] = useState('');

  const [isPostponeModalOpen, setIsPostponeModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!reservation) return null;

  const bundle = reservation.bundles || {};
  const totalAmount = bundle.price || 5000000;
  const payAmount = paymentType === 'dp' ? totalAmount * 0.5 : totalAmount;

  const currentStatus = reservation.payment_status || 'unpaid';
  const hasUploadedProof = !!payment?.proof_url || uploadSuccess;

  const handleProofSubmit = async (e) => {
    e.preventDefault();
    if (!proofUrl.trim()) return;
    await onSubmitProof({
      totalAmount,
      proofUrl: proofUrl.trim(),
      method,
      paymentType,
    });
    setUploadSuccess(true);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Reservation Info Card */}
      <Card>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <span className="font-mono text-xs font-bold text-slate-500">{reservation.ref_code}</span>
            <h3 className="text-lg font-bold text-slate-900">{reservation.full_name}</h3>
          </div>
          {/* Color Status Badges */}
          <StatusChip status={currentStatus} />
        </div>

        <div className="space-y-2 text-xs text-slate-600">
          <p className="flex justify-between">
            <span className="text-slate-400">Acara:</span>
            <span className="font-medium text-slate-800 uppercase">{reservation.reservation_type}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-slate-400">Paket Layanan:</span>
            <span className="font-medium text-slate-800">{bundle.name || 'Custom Package'}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-slate-400">Tanggal Acara:</span>
            <span className="font-medium text-slate-800">
              {new Date(reservation.event_date).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </p>
          <p className="flex justify-between text-sm pt-2 border-t border-slate-100 font-bold">
            <span className="text-slate-700">Total Biaya Reservasi:</span>
            <span className="text-primary">Rp {Number(totalAmount).toLocaleString('id-ID')}</span>
          </p>
        </div>
      </Card>

      {/* Manual Photo Proof Upload Section */}
      {currentStatus !== 'paid' ? (
        <form onSubmit={handleProofSubmit} className="space-y-5">
          <Card className="space-y-5">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">1. Jenis Pembayaran yang Ditransfer</h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentType('dp')}
                  className={`p-3 rounded-xl border text-left transition-colors ${
                    paymentType === 'dp'
                      ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-bold text-xs">Uang Muka (DP 50%)</p>
                  <p className="text-sm font-extrabold mt-1">
                    Rp {Number(totalAmount * 0.5).toLocaleString('id-ID')}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('full')}
                  className={`p-3 rounded-xl border text-left transition-colors ${
                    paymentType === 'full'
                      ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-bold text-xs">Pelunasan Penuh (Full)</p>
                  <p className="text-sm font-extrabold mt-1">
                    Rp {Number(totalAmount).toLocaleString('id-ID')}
                  </p>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">2. Pilih Metode Rekening Transfer</h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMethod('bank_transfer')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-colors ${
                    method === 'bank_transfer'
                      ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Landmark className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="font-bold text-xs">Bank Transfer (BCA)</p>
                    <p className="text-[11px] text-slate-400 font-mono">123-456-7890 (a.n Fattah WO)</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('e_wallet')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-colors ${
                    method === 'e_wallet'
                      ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Wallet className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="font-bold text-xs">E-Wallet (GoPay)</p>
                    <p className="text-[11px] text-slate-400 font-mono">0812-3456-7890 (Fattah WO)</p>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">3. Unggah Foto Bukti Pembayaran</h4>
              <Input
                label="URL / Link Foto Bukti Transfer Struk"
                placeholder="https://... foto/screenshot struk bukti bayar Anda"
                icon={<Image className="w-4 h-4" />}
                helperText="Upload foto struk atau screenshot bukti transfer Anda"
                value={proofUrl}
                onChange={(e) => setProofUrl(e.target.value)}
                required
              />
            </div>

            {hasUploadedProof && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Bukti foto pembayaran Anda sudah terkirim! Admin akan memeriksa struk Anda dan mengonfirmasi status menjadi <strong>Sudah Bayar DP (Kuning)</strong> atau <strong>Lunas (Hijau)</strong>.
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPostponeModalOpen(true)}
                className="flex-1"
              >
                <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                Tunda Payment
              </Button>

              <Button type="submit" isLoading={isSubmittingProof} className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                Kirim Bukti Foto Pembayaran
              </Button>
            </div>
          </Card>
        </form>
      ) : (
        <Card className="py-8 text-center bg-emerald-50 border-emerald-200">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
          <h4 className="text-lg font-bold text-emerald-900">Pembayaran Lunas (Verified by Admin)</h4>
          <p className="text-xs text-emerald-700 mt-1">
            Admin telah memverifikasi bukti foto pembayaran Anda. Reservasi pernikahan Anda resmi Lunas (🟢).
          </p>
        </Card>
      )}

      {/* Postpone Info Banner */}
      {payment?.is_postponed && (
        <Card className="bg-amber-50 border-amber-200 text-amber-900 p-4 text-xs space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-600" />
            Status: Penundaan Pembayaran Diaktifkan
          </p>
          <p>Batas DP: {payment.dp_due_date || '-'}</p>
          <p>Batas Pelunasan Full: {payment.full_due_date || '-'}</p>
        </Card>
      )}

      {/* Postpone Modal */}
      <PostponePaymentModal
        isOpen={isPostponeModalOpen}
        onClose={() => setIsPostponeModalOpen(false)}
        onConfirmPostpone={async ({ dpDueDate, fullDueDate }) => {
          await onPostpone({ totalAmount, dpDueDate, fullDueDate });
        }}
        isSubmitting={isPostponing}
      />
    </div>
  );
};

export default PaymentSummary;
