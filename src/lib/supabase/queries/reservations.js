import { supabase } from '../client';

/**
 * Create a new client reservation
 */
export async function createClientReservation(reservationData, clientId) {
  const {
    bundle_id,
    full_name,
    phone,
    email,
    reservation_type,
    workers_needed,
    notes,
    event_date,
    start_time,
    end_time,
    location,
    guest_count,
  } = reservationData;

  // Generate reference code WP-XXXX
  const randomRef = `WP-${Math.floor(1000 + Math.random() * 9000)}`;

  const { data, error } = await supabase
    .from('reservations')
    .insert({
      ref_code: randomRef,
      client_id: clientId || null,
      bundle_id: bundle_id || null,
      full_name,
      phone,
      email,
      reservation_type: reservation_type || 'wedding',
      workers_needed: parseInt(workers_needed || 1, 10),
      notes: notes || null,
      event_date,
      start_time: start_time || null,
      end_time: end_time || null,
      location: location || null,
      guest_count: guest_count ? parseInt(guest_count, 10) : null,
      status: 'pending_staffing',
      payment_status: 'unpaid',
    })
    .select(`
      *,
      bundles (*)
    `)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Fetch reservations for a specific client
 */
export async function getClientReservations(clientId) {
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      *,
      bundles (*),
      payments (*)
    `)
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetch reservation by ID
 */
export async function getReservationById(reservationId) {
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      *,
      bundles (*),
      payments (*)
    `)
    .eq('id', reservationId)
    .single();

  if (error) throw error;
  return data;
}
