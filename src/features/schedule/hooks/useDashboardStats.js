import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase/client';

/**
 * Fetch all admin dashboard statistics in parallel:
 * - totalReservations: all-time count
 * - activeWorkers: active workers (is_active=true)
 * - pendingStaffing: events needing more workers
 * - upcomingEvents: next 5 upcoming confirmed events
 * - revenueVerified: total from paid/dp_paid payments (admin-set amounts)
 */
async function fetchDashboardStats() {
  const today = new Date().toISOString().split('T')[0];

  const [
    { count: totalReservations },
    { count: activeWorkers },
    { count: pendingStaffing },
    { data: upcomingEvents },
    { data: revenueRows },
  ] = await Promise.all([
    supabase.from('reservations').select('*', { count: 'exact', head: true }),
    supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'worker')
      .eq('is_active', true),
    supabase
      .from('reservations')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending_staffing'),
    supabase
      .from('reservations')
      .select(`
        id,
        ref_code,
        full_name,
        event_date,
        start_time,
        location,
        reservation_type,
        status,
        payment_status,
        workers_needed,
        bundles (name)
      `)
      .gte('event_date', today)
      .neq('status', 'cancelled')
      .order('event_date', { ascending: true })
      .limit(6),
    supabase
      .from('payments')
      .select('total_amount, dp_amount, payment_type')
      .not('total_amount', 'is', null),
  ]);

  // Calculate verified revenue
  const totalRevenue = (revenueRows || []).reduce((sum, p) => {
    return sum + Number(p.total_amount || 0);
  }, 0);

  return {
    totalReservations: totalReservations || 0,
    activeWorkers: activeWorkers || 0,
    pendingStaffing: pendingStaffing || 0,
    upcomingEvents: upcomingEvents || [],
    totalRevenue,
  };
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}
