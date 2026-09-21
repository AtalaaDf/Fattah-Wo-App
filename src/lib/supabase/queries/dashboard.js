import { supabase } from '../client';

export async function getDashboardStats() {
  const today = new Date().toISOString().split('T')[0];

  const [
    { count: totalReservations, error: reservationsError },
    { count: activeWorkers, error: workersError },
    { count: pendingStaffing, error: staffingError },
    { data: upcomingEvents, error: upcomingError },
    { data: revenueRows, error: revenueError },
  ] = await Promise.all([
    supabase.from('reservations').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'worker').eq('is_active', true),
    supabase.from('reservations').select('*', { count: 'exact', head: true }).eq('status', 'pending_staffing'),
    supabase.from('reservations').select(`
      id, ref_code, full_name, event_date, start_time, location,
      reservation_type, status, payment_status, workers_needed, bundles (name)
    `).gte('event_date', today).neq('status', 'cancelled').order('event_date', { ascending: true }).limit(6),
    supabase.from('payments').select('total_amount, dp_amount, payment_type').not('total_amount', 'is', null),
  ]);

  const error = reservationsError || workersError || staffingError || upcomingError || revenueError;
  if (error) throw error;

  return {
    totalReservations: totalReservations || 0,
    activeWorkers: activeWorkers || 0,
    pendingStaffing: pendingStaffing || 0,
    upcomingEvents: upcomingEvents || [],
    totalRevenue: (revenueRows || []).reduce((sum, payment) => sum + Number(payment.total_amount || 0), 0),
  };
}

export async function getWorkerDashboardStats(workerId) {
  const today = new Date().toISOString().split('T')[0];
  const { data: events, error } = await supabase.from('event_workers').select(`
    id, status, assigned_at, role_needed,
    reservations (
      id, ref_code, full_name, event_date, start_time, location,
      reservation_type, status, bundles (name)
    )
  `).eq('worker_id', workerId).neq('status', 'removed_by_admin').order('assigned_at', { ascending: false });

  if (error) throw error;

  const allEvents = events || [];
  const completed = allEvents.filter((event) => event.reservations?.status === 'completed');
  const upcoming = allEvents.filter((event) =>
    event.reservations?.event_date >= today &&
    event.reservations?.status !== 'cancelled' &&
    event.reservations?.status !== 'completed'
  );
  const upcomingSorted = [...upcoming].sort(
    (a, b) => new Date(a.reservations.event_date) - new Date(b.reservations.event_date)
  );

  return {
    completedCount: completed.length,
    upcomingCount: upcoming.length,
    cancelRequestedCount: allEvents.filter((event) => event.status === 'cancel_requested').length,
    upcomingEvents: upcomingSorted.slice(0, 5),
    nextEvent: upcomingSorted[0] || null,
  };
}