import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getWorkers, createWorkerAccount, toggleWorkerActiveStatus, deleteWorker } from '../../../lib/supabase/queries/workers';
import { useAuthStore } from '../../../store/useAuthStore';

export function useWorkerManagement() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const workersQuery = useQuery({
    queryKey: ['workers'],
    queryFn: getWorkers,
  });

  const addWorkerMutation = useMutation({
    mutationFn: ({ fullName, username, password }) =>
      createWorkerAccount({ fullName, username, password, adminId: user?.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
      toast.success('Akun worker baru berhasil dibuat!');
    },
    onError: (err) => {
      toast.error(err.message || 'Gagal membuat akun worker.');
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ workerId, isActive }) => toggleWorkerActiveStatus(workerId, isActive),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
      if (variables.isActive) {
        toast.success('Akun worker berhasil diaktifkan kembali. Worker kini bisa login.');
      } else {
        toast.warning('Akun worker berhasil dibekukan. Akses login worker telah ditahan.');
      }
    },
    onError: (err) => {
      toast.error(err.message || 'Gagal mengubah status akun worker.');
    },
  });

  const deleteWorkerMutation = useMutation({
    mutationFn: (workerId) => deleteWorker(workerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
      toast.success('Data worker telah berhasil dihapus secara permanen.');
    },
    onError: (err) => {
      toast.error(err.message || 'Gagal menghapus data worker.');
    },
  });

  return {
    workers: workersQuery.data || [],
    isLoading: workersQuery.isLoading,
    isError: workersQuery.isError,
    error: workersQuery.error,
    refetch: workersQuery.refetch,

    addWorker: addWorkerMutation.mutateAsync,
    isAdding: addWorkerMutation.isPending,
    addError: addWorkerMutation.error,

    toggleStatus: toggleStatusMutation.mutateAsync,
    isToggling: toggleStatusMutation.isPending,

    removeWorker: deleteWorkerMutation.mutateAsync,
    isDeleting: deleteWorkerMutation.isPending,
  };
}
