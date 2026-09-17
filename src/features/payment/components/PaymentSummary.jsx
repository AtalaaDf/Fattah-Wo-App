import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import StatusChip from '../../../components/ui/StatusChip';
import { Landmark, Calendar, Clock, Upload, CheckCircle2, AlertCircle, FileImage, X, Copy, Check } from 'lucide-react';
import PostponePaymentModal from './PostponePaymentModal';
import { uploadPaymentProof } from '../../../lib/supabase/storage';
import { toast } from 'sonner';
import { PAYMENT_METHODS } from '../data/paymentData';

export const PaymentSummary = ({ reservation, payment, onSubmitProof, onPostpone, isSubmittingProof, isPostponing }) => {
  const [paymentType, setPaymentType] = useState('full'); // 'dp' | 'full'
  const [selectedMethodId, setSelectedMethodId] = useState('bca');
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [isPostponeModalOpen, setIsPostponeModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!reservation) {
    return (
      <Card className="py-12 text-center text-slate-500 max-w-2xl mx-auto space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
        <div>
          <p className="font-bold text-slate-800 text-base">Data Reservasi Tidak Ditemukan</p>
          <p className="text-xs text-slate-400 mt-1">
            Reservasi ini mungkin sedang diproses atau ID tidak valid.
          </p>
        </div>
        <Link to="/client/reservation">
          <Button variant="outline" size="sm">Kembali ke Reservasi Saya</Button>
        </Link>
      </Card>
    );
  }

  const bundle = reservation.bundles || {};
  const adminVerifiedAmount = payment?.total_amount;
  const estimatedAmount = bundle.price || 0;
  const displayAmount = adminVerifiedAmount || estimatedAmount;

  const currentStatus = reservation.payment_status || 'unpaid';
  const hasUploadedProof = !!payment?.proof_url || uploadSuccess;

  const currentMethodObj = PAYMENT_METHODS.find((m) => m.id === selectedMethodId) || PAYMENT_METHODS[0];

  const handleCopyAccount = (number) => {
    navigator.clipboard.writeText(number.replace(/\D/g, ''));
    setCopiedAccount(true);
    toast.success('Nomor rekening berhasil disalin!');
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleProofSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      const proofUrl = await uploadPaymentProof(reservation.id, selectedFile);
      await onSubmitProof({
        proofUrl,
        method: currentMethodObj.name,
        paymentType,
      });
      setUploadSuccess(true);
    } finally {
      setIsUploading(false);
    }
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
            <span className="text-slate-700">Estimasi Tagihan:</span>
            <span className={adminVerifiedAmount ? 'line-through text-slate-400' : 'text-primary'}>
              Rp {Number(estimatedAmount).toLocaleString('id-ID')}
            </span>
          </p>
          {adminVerifiedAmount && (
            <p className="flex justify-between text-sm font-bold">
              <span className="text-slate-700">Total Terverifikasi Admin:</span>
              <span className="text-emerald-600">Rp {Number(adminVerifiedAmount).toLocaleString('id-ID')}</span>
            </p>
          )}
        </div>
      </Card>

      {/* Manual Photo Proof Upload Section */}
      {currentStatus !== 'paid' ? (
        <form onSubmit={handleProofSubmit} className="space-y-5">
          <Card className="space-y-5">
            {/* Step 1: Jenis Pembayaran */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Langkah 1: Pilih Jenis Pembayaran
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentType('dp')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    paymentType === 'dp'
                      ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-bold text-xs">Uang Muka (DP 50%)</p>
                  <p className="text-sm font-extrabold mt-1 text-primary">
                    {displayAmount ? `Rp ${Number(displayAmount * 0.5).toLocaleString('id-ID')}` : 'Menunggu admin'}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('full')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    paymentType === 'full'
                      ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-bold text-xs">Pelunasan Penuh (Full)</p>
                  <p className="text-sm font-extrabold mt-1 text-primary">
                    {displayAmount ? `Rp ${Number(displayAmount).toLocaleString('id-ID')}` : 'Menunggu admin'}
                  </p>
                </button>
              </div>
            </div>

            {/* Step 2: Top-Up Style Payment Method Selector */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Langkah 2: Pilih Bank / Metode Transfer (Top-Up Style)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                {PAYMENT_METHODS.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedMethodId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedMethodId(item.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isSelected ? item.activeColor : item.color
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-white/80' : 'bg-white'}`}>
                          <Icon className="w-4 h-4 text-slate-700" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-xs leading-tight truncate">{item.name}</p>
                          <p className="text-[10px] text-slate-500 font-medium mt-0.5">{item.badge}</p>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-primary bg-primary text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Destination Account Details Box */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Tujuan Transfer ({currentMethodObj.name}):</span>
                  <span className="text-amber-400 font-bold">{currentMethodObj.accountName}</span>
                </div>
                <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-800">
                  <span className="font-mono text-lg font-extrabold tracking-wider text-white">
                    {currentMethodObj.accountNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyAccount(currentMethodObj.accountNumber)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedAccount ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin No. Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Unggah Foto Bukti Transfer */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Langkah 3: Unggah Foto Bukti Pembayaran
              </h4>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={handleFileChange}
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
                    onClick={() => { setSelectedFile(null); setFilePreview(null); }}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
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

              <Button type="submit" isLoading={isSubmittingProof || isUploading} disabled={!selectedFile} className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                {isUploading ? 'Mengunggah...' : 'Kirim Bukti Foto Pembayaran'}
              </Button>
            </div>
          </Card>
        </form>
      ) : (
        <Card className="py-8 text-center bg-emerald-50 border-emerald-200">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
          <h4 className="text-lg font-bold text-emerald-900">Pembayaran Lunas (Verified by Admin)</h4>
          <p className="text-xs text-emerald-700 mt-1">
            Admin telah memverifikasi bukti foto pembayaran Anda. Reservasi pernikahan Anda resmi Lunas.
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
          // NOTE: totalAmount removed — admin sets it after payment verification
          await onPostpone({ dpDueDate, fullDueDate });
        }}
        isSubmitting={isPostponing}
      />
    </div>
  );
};

export default PaymentSummary;
