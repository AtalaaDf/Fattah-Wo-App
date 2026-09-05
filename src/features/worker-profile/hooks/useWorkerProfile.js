import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWorkerDetails, upsertWorkerDetails } from '../../../lib/supabase/queries/workers';
import { useAuthStore } from '../../../store/useAuthStore';

export function useWorkerProfile() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const profileQuery = useQuery({
    queryKey: ['workerProfile', user?.id],
    queryFn: () => getWorkerDetails(user?.id),
    enabled: !!user?.id,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (detailsData) => upsertWorkerDetails(user?.id, detailsData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workerProfile', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['workers'] });
    },
  });

  return {
    profile: profileQuery.data,
    details: profileQuery.data?.worker_details || {},
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,

    updateProfile: updateProfileMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
    updateError: updateProfileMutation.error,
  };
}
