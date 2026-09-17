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
 * Helper to fetch bundle price for default total_amount on payment insertion
 */
async function getDefaultBundlePrice(reservationId) {
  try {
    const { data } = await supabase
      .from('reservations')
      .select('bundle_id, bundles(price)')
      .eq('id', reservationId)
      .maybeSingle();

    if (data?.bundles?.price) {
      return parseFloat(data.bundles.price);
    }
  } catch (err) {
    console.error('Error fetching bundle price:', err);
  }
  return 0;
}

/**
 * Client uploads payment receipt photo (proof_url) + sets method & type.
 * NOTE: paid_at, admin_notes, dp_amount, total_amount are ADMIN-ONLY fields.
 * Trigger `trg_protect_payment_fields` will reject any client attempt to set them.
 * Storage path convention: payment-proofs/{reservationId}/filename
 */
export async function submitPaymentProofPhoto({ reservationId, proofUrl, method, paymentType }) {
  const existing = await getPaymentByReservationId(reservationId);

  const payload = {
    reservation_id: reservationId,
    proof_url: proofUrl,
    method: method || 'bank_transfer',
    payment_type: paymentType || 'full',
    updated_at: new Date().toISOString(),
  };

  if (existing && existing.id) {
    const { data, error } = await supabase
      .from('payments')
      .update(payload)
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    const defaultPrice = await getDefaultBundlePrice(reservationId);
    const { data, error } = await supabase
      .from('payments')
      .insert({
        ...payload,
        total_amount: defaultPrice,
        dp_amount: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

/**
 * ADMIN ONLY: Verify photo & update payment status (unpaid -> dp_paid or paid)
 * Admin can also update admin_notes, paid_at, dp_amount, total_amount.
 */
export async function adminUpdatePaymentStatus({ reservationId, paymentStatus, adminNotes, totalAmount, dpAmount }) {
  // Update payment_status in reservations table
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
    const defaultPrice = await getDefaultBundlePrice(reservationId);
    await supabase
      .from('payments')
      .insert({
        reservation_id: reservationId,
        total_amount: totalAmount !== undefined ? parseFloat(totalAmount) : defaultPrice,
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
  const existing = await getPaymentByReservationId(reservationId);

  const payload = {
    reservation_id: reservationId,
    is_postponed: true,
    dp_due_date: dpDueDate || null,
    full_due_date: fullDueDate || null,
    updated_at: new Date().toISOString(),
  };

  if (existing && existing.id) {
    const { data, error } = await supabase
      .from('payments')
      .update(payload)
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    const defaultPrice = await getDefaultBundlePrice(reservationId);
    const { data, error } = await supabase
      .from('payments')
      .insert({
        ...payload,
        total_amount: defaultPrice,
        dp_amount: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
