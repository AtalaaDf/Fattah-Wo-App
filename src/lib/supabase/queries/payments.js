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
 * Client uploads payment receipt photo (proof_url) + sets method & type.
 */
export async function submitPaymentProofPhoto({ reservationId, proofUrl, method, paymentType }) {
  const { data, error } = await supabase.rpc('submit_payment_proof', {
    p_reservation_id: reservationId,
    p_proof_url: proofUrl,
    p_method: method || 'bank_transfer',
    p_payment_type: paymentType || 'full',
  });

  if (error) throw error;
  return data;
}

/**
 * ADMIN ONLY: Verify photo & update payment status (unpaid -> dp_paid or paid)
 * Admin can also update admin_notes, paid_at, dp_amount, total_amount.
 */
export async function adminUpdatePaymentStatus({ reservationId, paymentStatus, adminNotes, totalAmount, dpAmount }) {
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

  // Admin updates financial fields + notes in payments table
  const paymentUpdate = { updated_at: new Date().toISOString() };
  if (adminNotes !== undefined) paymentUpdate.admin_notes = adminNotes;
  if (totalAmount !== undefined) paymentUpdate.total_amount = parseFloat(totalAmount);
  if (dpAmount !== undefined) paymentUpdate.dp_amount = parseFloat(dpAmount);
  if (paymentStatus === 'dp_paid' || paymentStatus === 'paid') {
    paymentUpdate.paid_at = new Date().toISOString();
  }

  const existing = await getPaymentByReservationId(reservationId);
  if (existing && existing.id) {
    await supabase
      .from('payments')
      .update(paymentUpdate)
      .eq('id', existing.id);
  } else {
    const { data: bundleData, error: bundleError } = await supabase
      .from('reservations')
      .select('bundles(price)')
      .eq('id', reservationId)
      .single();

    if (bundleError) throw bundleError;

    await supabase
      .from('payments')
      .insert({
        reservation_id: reservationId,
        total_amount: totalAmount !== undefined ? parseFloat(totalAmount) : Number(bundleData?.bundles?.price || 0),
        dp_amount: dpAmount !== undefined ? parseFloat(dpAmount) : 0,
        ...paymentUpdate,
      });
  }

  return reservationData;
}

/**
 * Postpone payment — client sets due dates only (no amount fields).
 * total_amount must be set later by admin after verifying payment.
 */
export async function postponePayment({ reservationId, dpDueDate, fullDueDate }) {
  const { data, error } = await supabase.rpc('postpone_payment', {
    p_reservation_id: reservationId,
    p_dp_due_date: dpDueDate || null,
    p_full_due_date: fullDueDate || null,
  });

  if (error) throw error;
  return data;
}
