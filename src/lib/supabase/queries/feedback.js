import { supabase } from '../client';

/**
 * Fetch all feedback for Admin
 */
export async function getFeedbacks() {
  const { data, error } = await supabase
    .from('feedback')
    .select(`
      *,
      profiles (full_name, email, avatar_url),
      reservations (ref_code, reservation_type)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Submit feedback by Client
 */
export async function createFeedback({ clientId, reservationId, message, rating }) {
  const { data, error } = await supabase
    .from('feedback')
    .insert({
      client_id: clientId,
      reservation_id: reservationId || null,
      message,
      rating: parseInt(rating || 5, 10),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
