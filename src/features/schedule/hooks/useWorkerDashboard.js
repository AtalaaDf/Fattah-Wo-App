import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase/client';
import { useAuthStore } from '../../../store/useAuthStore';

/**
 * Fetch worker-specific dashboard stats:
 * - completedEvents: jumlah event yang sudah selesai (status = 'completed')
 * - upcomingEvents: event mendatang yang sudah diklaim worker ini
 * - cancelRequested: jumlah event yang sedang diajukan pembatalan
 * - nextEvent: event terdekat yang akan datang
 */
async function fetchWorkerDashboardStats(workerId) {
  const today = new Date().toISOString().split('T')[0];

  const { data: allWorkerEvents, error } = await supabase
    .from('event_workers')
    .select(`
      id,
      status,
      assigned_at,
      role_needed,
      reservations (
        id,
        ref_code,
        full_name,
        event_date,
        start_time,
        location,
        reservation_type,
        status,
        bundles (name)
      )
    `)
    .eq('worker_id', workerId)
    .neq('status', 'removed_by_admin')
    .order('assigned_at', { ascending: false });

  if (error) throw error;

  const events = allWorkerEvents || [];

  const completed = events.filter(
    (ew) => ew.reservations?.status === 'completed'
  );

  const upcoming = events.filter(
    (ew) =>
      ew.reservations?.event_date >= today &&
      ew.reservations?.status !== 'cancelled' &&
      ew.reservations?.status !== 'completed'
  );

  const cancelRequested = events.filter((ew) => ew.status === 'cancel_requested');

  // Sort upcoming by date ascending for "next event"
  const upcomingSorted = [...upcoming].sort(
    (a, b) => new Date(a.reservations.event_date) - new Date(b.reservations.event_date)
  );

  return {
    completedCount: completed.length,
    upcomingCount: upcoming.length,
    cancelRequestedCount: cancelRequested.length,
    upcomingEvents: upcomingSorted.slice(0, 5),
    nextEvent: upcomingSorted[0] || null,
  };
}

export function useWorkerDashboard() {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ['workerDashboard', user?.id],
    queryFn: () => fetchWorkerDashboardStats(user?.id),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
