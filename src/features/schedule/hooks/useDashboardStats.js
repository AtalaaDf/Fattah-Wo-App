import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '../../../lib/supabase/queries/dashboard';

/**
 * Fetch all admin dashboard statistics in parallel:
 * - totalReservations: all-time count
 * - activeWorkers: active workers (is_active=true)
 * - pendingStaffing: events needing more workers
 * - upcomingEvents: next 5 upcoming confirmed events
 * - revenueVerified: total from paid/dp_paid payments (admin-set amounts)
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
