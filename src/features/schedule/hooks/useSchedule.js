import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getReservationsSchedule,
  getAvailableEventsForWorker,
  getWorkerSchedule,
  claimEventRPC,
  requestEventCancel,
  assignWorkerByAdmin,
  removeWorkerFromEvent,
} from '../../../lib/supabase/queries/schedule';
import { adminUpdatePaymentStatus } from '../../../lib/supabase/queries/payments';
import { useAuthStore } from '../../../store/useAuthStore';

export function useSchedule() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);

  // Admin Master Schedule Query
  const adminScheduleQuery = useQuery({
    queryKey: ['adminSchedule'],
    queryFn: getReservationsSchedule,
    enabled: profile?.role === 'admin',
  });

  // Worker Available Opportunities Query
  const availableEventsQuery = useQuery({
    queryKey: ['availableEvents', user?.id],
    queryFn: () => getAvailableEventsForWorker(user?.id),
    enabled: profile?.role === 'worker',
  });

  // Worker Schedule Query
  const workerScheduleQuery = useQuery({
    queryKey: ['workerSchedule', user?.id],
    queryFn: () => getWorkerSchedule(user?.id),
    enabled: profile?.role === 'worker',
  });

  // Worker Claim Event Mutation
  const claimMutation = useMutation({
    mutationFn: ({ reservationId, roleNeeded }) =>
      claimEventRPC({ reservationId, workerId: user?.id, roleNeeded }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availableEvents'] });
      queryClient.invalidateQueries({ queryKey: ['workerSchedule'] });
      queryClient.invalidateQueries({ queryKey: ['adminSchedule'] });
      toast.success('Berhasil mengambil job! Jadwal sudah diperbarui.');
    },
    onError: (err) => {
      toast.error(err.message || 'Gagal mengambil job. Coba lagi.');
    },
  });

  // Worker Request Cancel Mutation
  const requestCancelMutation = useMutation({
    mutationFn: (eventWorkerId) => requestEventCancel(eventWorkerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workerSchedule'] });
      queryClient.invalidateQueries({ queryKey: ['adminSchedule'] });
      toast.success('Pengajuan pembatalan berhasil dikirim ke Admin.');
    },
    onError: (err) => {
      toast.error(err.message || 'Gagal mengajukan pembatalan.');
    },
  });

  // Admin Assign Worker Mutation
  const assignMutation = useMutation({
    mutationFn: ({ reservationId, workerId, roleNeeded }) =>
      assignWorkerByAdmin({ reservationId, workerId, roleNeeded }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSchedule'] });
      toast.success('Worker berhasil ditugaskan ke acara.');
    },
    onError: (err) => {
      toast.error(err.message || 'Gagal menugaskan worker.');
    },
  });

  // Admin Remove Worker Mutation
  const removeMutation = useMutation({
    mutationFn: ({ eventWorkerId, reason }) =>
      removeWorkerFromEvent({ eventWorkerId, adminId: user?.id, reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSchedule'] });
      toast.success('Worker berhasil dikeluarkan dari acara.');
    },
    onError: (err) => {
      toast.error(err.message || 'Gagal mengeluarkan worker.');
    },
  });

  // Admin Update Payment Status Mutation (verify proof photo)
  const updatePaymentStatusMutation = useMutation({
    mutationFn: ({ reservationId, paymentStatus, adminNotes, totalAmount, dpAmount }) =>
      adminUpdatePaymentStatus({ reservationId, paymentStatus, adminNotes, totalAmount, dpAmount }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSchedule'] });
      queryClient.invalidateQueries({ queryKey: ['payment'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      toast.success('Status pembayaran berhasil diperbarui.');
    },
    onError: (err) => {
      toast.error(err.message || 'Gagal memperbarui status pembayaran.');
    },
  });

  return {
    adminEvents: adminScheduleQuery.data || [],
    isAdminLoading: adminScheduleQuery.isLoading,

    availableEvents: availableEventsQuery.data || [],
    isAvailableLoading: availableEventsQuery.isLoading,

    workerEvents: workerScheduleQuery.data || [],
    isWorkerLoading: workerScheduleQuery.isLoading,

    claimEvent: claimMutation.mutateAsync,
    isClaiming: claimMutation.isPending,
    claimError: claimMutation.error,

    requestCancel: requestCancelMutation.mutateAsync,
    isRequestingCancel: requestCancelMutation.isPending,

    assignWorker: assignMutation.mutateAsync,
    isAssigning: assignMutation.isPending,

    removeWorker: removeMutation.mutateAsync,
    isRemoving: removeMutation.isPending,

    updatePaymentStatus: updatePaymentStatusMutation.mutateAsync,
    isUpdatingPayment: updatePaymentStatusMutation.isPending,
  };
}
