import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '../../../lib/supabase/queries/dashboard';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
