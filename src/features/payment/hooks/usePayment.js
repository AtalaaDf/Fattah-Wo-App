import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getPaymentByReservationId,
  submitPaymentProofPhoto,
  adminUpdatePaymentStatus,
  postponePayment,
} from '../../../lib/supabase/queries/payments';

export function usePayment(reservationId) {
  const queryClient = useQueryClient();

  const paymentQuery = useQuery({
    queryKey: ['payment', reservationId],
    queryFn: () => getPaymentByReservationId(reservationId),
    enabled: !!reservationId,
  });

  const submitProofMutation = useMutation({
    // NOTE: totalAmount is admin-only, do NOT pass it from client
    mutationFn: ({ proofUrl, method, paymentType }) =>
      submitPaymentProofPhoto({ reservationId, proofUrl, method, paymentType }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment', reservationId] });
      queryClient.invalidateQueries({ queryKey: ['reservation', reservationId] });
      queryClient.invalidateQueries({ queryKey: ['clientReservations'] });
      queryClient.invalidateQueries({ queryKey: ['adminSchedule'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Gagal mengirim bukti pembayaran.');
    },
  });

  const adminUpdateStatusMutation = useMutation({
    mutationFn: ({ targetReservationId, paymentStatus, adminNotes }) =>
      adminUpdatePaymentStatus({
        reservationId: targetReservationId || reservationId,
        paymentStatus,
        adminNotes,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSchedule'] });
      queryClient.invalidateQueries({ queryKey: ['payment'] });
      queryClient.invalidateQueries({ queryKey: ['clientReservations'] });
      toast.success('Status pembayaran berhasil diperbarui.');
    },
    onError: (err) => {
      toast.error(err.message || 'Gagal memperbarui status pembayaran.');
    },
  });

  const postponeMutation = useMutation({
    mutationFn: ({ dpDueDate, fullDueDate }) =>
      postponePayment({ reservationId, dpDueDate, fullDueDate }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment', reservationId] });
      toast.success('Tanggal pembayaran berhasil dijadwal ulang.');
    },
    onError: (err) => {
      toast.error(err.message || 'Gagal menjadwalkan ulang pembayaran.');
    },
  });

  return {
    payment: paymentQuery.data,
    isLoading: paymentQuery.isLoading,

    submitProof: submitProofMutation.mutateAsync,
    isSubmittingProof: submitProofMutation.isPending,

    adminUpdateStatus: adminUpdateStatusMutation.mutateAsync,
    isAdminUpdating: adminUpdateStatusMutation.isPending,

    postpone: postponeMutation.mutateAsync,
    isPostponing: postponeMutation.isPending,
  };
}
