import { supabase } from '../client';

/**
 * Fetch all reservations for Admin Schedule Master view
 */
export async function getReservationsSchedule() {
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      *,
      bundles (id, name, price, category),
      event_workers (
        id,
        worker_id,
        role_needed,
        status,
        assigned_at,
        profiles (id, full_name, username, avatar_url, phone, worker_details (*))
      )
    `)
    .order('event_date', { ascending: true });

  if (error) throw error;
  return data;
}

/**
 * Fetch events available for workers to claim (where workers_needed > assigned count and status != cancelled)
 */
export async function getAvailableEventsForWorker(workerId) {
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      *,
      bundles (id, name, category),
      event_workers (
        id,
        worker_id,
        status
      )
    `)
    .neq('status', 'cancelled')
    .order('event_date', { ascending: true });

  if (error) throw error;

  // Filter events where assigned count < workers_needed
  return (data || []).map((res) => {
    const activeWorkers = (res.event_workers || []).filter((ew) => ew.status === 'assigned');
    const isAlreadyAssigned = activeWorkers.some((ew) => ew.worker_id === workerId);
    const slotsRemaining = res.workers_needed - activeWorkers.length;

    return {
      ...res,
      activeWorkersCount: activeWorkers.length,
      slotsRemaining,
      isAlreadyAssigned,
    };
  });
}

/**
 * Fetch events claimed/assigned to a specific worker
 */
export async function getWorkerSchedule(workerId) {
  const { data, error } = await supabase
    .from('event_workers')
    .select(`
      id,
      reservation_id,
      worker_id,
      role_needed,
      status,
      assigned_at,
      reservations (
        id,
        ref_code,
        full_name,
        phone,
        email,
        reservation_type,
        event_date,
        start_time,
        end_time,
        location,
        status,
        payment_status,
        bundles (name)
      )
    `)
    .eq('worker_id', workerId)
    .neq('status', 'removed_by_admin')
    .order('assigned_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Claim an event via Supabase RPC function 'claim_event'
 */
export async function claimEventRPC({ reservationId, workerId, roleNeeded = null }) {
  const { data, error } = await supabase.rpc('claim_event', {
    p_reservation_id: reservationId,
    p_worker_id: workerId,
    p_role_needed: roleNeeded,
  });

  if (error) throw error;
  return data;
}

/**
 * Worker requests cancellation for a claimed job
 */
export async function requestEventCancel(eventWorkerId) {
  const { data, error } = await supabase
    .from('event_workers')
    .update({ status: 'cancel_requested' })
    .eq('id', eventWorkerId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Admin assigns a worker to a reservation
 */
export async function assignWorkerByAdmin({ reservationId, workerId, roleNeeded = null }) {
  const { data, error } = await supabase
    .from('event_workers')
    .insert({
      reservation_id: reservationId,
      worker_id: workerId,
      role_needed: roleNeeded,
      status: 'assigned',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Admin removes a worker from an event
 */
export async function removeWorkerFromEvent({ eventWorkerId, adminId, reason = '' }) {
  const { data, error } = await supabase
    .from('event_workers')
    .update({
      status: 'removed_by_admin',
      removed_by: adminId,
      removed_reason: reason,
    })
    .eq('id', eventWorkerId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
