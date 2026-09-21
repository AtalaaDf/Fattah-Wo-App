import { useQuery } from '@tanstack/react-query';
import { getWorkerDashboardStats } from '../../../lib/supabase/queries/dashboard';
import { useAuthStore } from '../../../store/useAuthStore';

export function useWorkerDashboard() {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ['workerDashboard', user?.id],
    queryFn: () => getWorkerDashboardStats(user?.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
