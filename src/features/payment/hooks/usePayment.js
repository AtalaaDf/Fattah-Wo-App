import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
    mutationFn: ({ totalAmount, proofUrl, method, paymentType }) =>
      submitPaymentProofPhoto({ reservationId, totalAmount, proofUrl, method, paymentType }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment', reservationId] });
      queryClient.invalidateQueries({ queryKey: ['reservation', reservationId] });
      queryClient.invalidateQueries({ queryKey: ['clientReservations'] });
      queryClient.invalidateQueries({ queryKey: ['adminSchedule'] });
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
    },
  });

  const postponeMutation = useMutation({
    mutationFn: ({ totalAmount, dpDueDate, fullDueDate }) =>
      postponePayment({ reservationId, totalAmount, dpDueDate, fullDueDate }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment', reservationId] });
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
