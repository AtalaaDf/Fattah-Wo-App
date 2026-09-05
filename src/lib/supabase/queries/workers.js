import { supabase } from '../client';

/**
 * Fetch all workers (profiles with role='worker') along with their details
 */
export async function getWorkers() {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      username,
      email,
      phone,
      avatar_url,
      is_active,
      created_at,
      worker_details (*)
    `)
    .eq('role', 'worker')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Create a new worker account
 * Admin creates account with username & password.
 * Uses synthetic email: <username>@worker.fattahwo.internal
 */
export async function createWorkerAccount({ fullName, username, password, adminId }) {
  const syntheticEmail = `${username.toLowerCase().trim()}@worker.fattahwo.internal`;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: syntheticEmail,
    password,
    options: {
      data: {
        full_name: fullName,
        username: username.trim(),
        role: 'worker',
      },
    },
  });

  if (authError) throw authError;

  // Update created_by in profiles if user created
  if (authData.user && adminId) {
    await supabase
      .from('profiles')
      .update({ created_by: adminId })
      .eq('id', authData.user.id);
  }

  return authData;
}

/**
 * Toggle worker active/inactive status (Admin)
 */
export async function toggleWorkerActiveStatus(workerId, isActive) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ is_active: isActive })
    .eq('id', workerId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Toggle worker ON/OFF availability status (Worker self toggle)
 */
export async function toggleWorkerAvailability(profileId, isAvailable) {
  const { data, error } = await supabase
    .from('worker_details')
    .upsert({
      profile_id: profileId,
      is_available: isAvailable,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'profile_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get worker profile & details for a specific worker
 */
export async function getWorkerDetails(profileId) {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      username,
      email,
      phone,
      avatar_url,
      is_active,
      worker_details (*)
    `)
    .eq('id', profileId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Upsert worker details (filled by worker themselves)
 */
export async function upsertWorkerDetails(profileId, details) {
  const { birth_date, birth_place, gender, last_education, profile_photo_url, contact_email, contact_phone, is_available } = details;

  const { data, error } = await supabase
    .from('worker_details')
    .upsert({
      profile_id: profileId,
      birth_date: birth_date || null,
      birth_place: birth_place || null,
      gender: gender || null,
      last_education: last_education || null,
      profile_photo_url: profile_photo_url || null,
      contact_email: contact_email || null,
      contact_phone: contact_phone || null,
      is_available: is_available ?? true,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'profile_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}
