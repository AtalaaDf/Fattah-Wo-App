import { supabase } from '../client';

/**
 * Fetch payment info for a reservation
 */
export async function getPaymentByReservationId(reservationId) {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('reservation_id', reservationId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

/**
 * Client uploads payment receipt photo (proof_url)
 * Status in reservations stays pending until verified by Admin.
 */
export async function submitPaymentProofPhoto({ reservationId, totalAmount, proofUrl, method, paymentType }) {
  const { data, error } = await supabase
    .from('payments')
    .upsert({
      reservation_id: reservationId,
      total_amount: parseFloat(totalAmount || 0),
      proof_url: proofUrl,
      method: method || 'bank_transfer',
      payment_type: paymentType || 'full',
      paid_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'reservation_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * ADMIN ONLY: Verify photo & update payment status (unpaid -> dp_paid or paid)
 */
export async function adminUpdatePaymentStatus({ reservationId, paymentStatus, adminNotes }) {
  // Update payment status in reservations
  const { data: reservationData, error: resError } = await supabase
    .from('reservations')
    .update({
      payment_status: paymentStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', reservationId)
    .select()
    .single();

  if (resError) throw resError;

  // Optionally update admin notes in payments
  if (adminNotes !== undefined) {
    await supabase
      .from('payments')
      .update({
        admin_notes: adminNotes,
        updated_at: new Date().toISOString(),
      })
      .eq('reservation_id', reservationId);
  }

  return reservationData;
}

/**
 * Postpone payment (set dp_due_date & full_due_date)
 */
export async function postponePayment({ reservationId, totalAmount, dpDueDate, fullDueDate }) {
  const { data, error } = await supabase
    .from('payments')
    .upsert({
      reservation_id: reservationId,
      total_amount: parseFloat(totalAmount || 0),
      is_postponed: true,
      dp_due_date: dpDueDate || null,
      full_due_date: fullDueDate || null,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'reservation_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}
