import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWorkers, createWorkerAccount, toggleWorkerActiveStatus } from '../../../lib/supabase/queries/workers';
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
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ workerId, isActive }) => toggleWorkerActiveStatus(workerId, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
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
  };
}
