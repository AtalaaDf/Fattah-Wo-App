import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBundles, createBundle, updateBundle, deleteBundle } from '../../../lib/supabase/queries/bundles';
import { useAuthStore } from '../../../store/useAuthStore';

export function useBundles({ activeOnly = false, category = 'all' } = {}) {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const bundlesQuery = useQuery({
    queryKey: ['bundles', { activeOnly, category }],
    queryFn: () => getBundles({ activeOnly, category }),
  });

  const createMutation = useMutation({
    mutationFn: ({ bundleData, features }) => createBundle(bundleData, features, user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bundles'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ bundleId, bundleData, features }) => updateBundle(bundleId, bundleData, features),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bundles'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (bundleId) => deleteBundle(bundleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bundles'] });
    },
  });

  return {
    bundles: bundlesQuery.data || [],
    isLoading: bundlesQuery.isLoading,
    isError: bundlesQuery.isError,
    error: bundlesQuery.error,

    createBundle: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    updateBundle: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,

    deleteBundle: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
