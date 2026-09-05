import React from 'react';
import { useParams } from 'react-router-dom';
import { useReservation } from '../../features/reservation/hooks/useReservation';
import { usePayment } from '../../features/payment/hooks/usePayment';
import PaymentSummary from '../../features/payment/components/PaymentSummary';
import { CreditCard } from 'lucide-react';

export const ClientPaymentPage = () => {
  const { reservationId } = useParams();
  const { currentReservation, isSingleLoading } = useReservation(reservationId);
  const { payment, submitProof, postpone, isSubmittingProof, isPostponing } = usePayment(reservationId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
          <CreditCard className="w-7 h-7 text-primary" />
          Ringkasan & Pembayaran Acara
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Selesaikan pembayaran uang muka/pelunasan atau atur jadwal penundaan pembayaran.
        </p>
      </div>

      {isSingleLoading ? (
        <div className="h-64 bg-slate-100 rounded-xl animate-pulse max-w-2xl mx-auto" />
      ) : (
        <PaymentSummary
          reservation={currentReservation}
          payment={payment}
          onSubmitProof={submitProof}
          onPostpone={postpone}
          isSubmittingProof={isSubmittingProof}
          isPostponing={isPostponing}
        />
      )}
    </div>
  );
};

export default ClientPaymentPage;
