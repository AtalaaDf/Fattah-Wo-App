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
 */
export async function createWorkerAccount({ fullName, username, password, adminId }) {
  const syntheticEmail = `worker_${username.toLowerCase().trim()}@gmail.com`;

  // 1. Save current admin session before signUp hijacks it
  const { data: { session: adminSession } } = await supabase.auth.getSession();

  // 2. Sign up new worker (this auto-signs-in as the worker)
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

  // 3. Update created_by while we still have a valid session
  if (authData.user && adminId) {
    await supabase
      .from('profiles')
      .update({ created_by: adminId })
      .eq('id', authData.user.id);
  }

  // 4. Restore admin session so admin stays logged in
  if (adminSession?.access_token && adminSession?.refresh_token) {
    await supabase.auth.setSession({
      access_token: adminSession.access_token,
      refresh_token: adminSession.refresh_token,
    });
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

/**
 * Delete a worker account and details (Admin)
 */
export async function deleteWorker(workerId) {
  // Delete worker details child record first
  await supabase.from('worker_details').delete().eq('profile_id', workerId);
  
  // Delete profile record
  const { data, error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', workerId);

  if (error) throw error;
  return data;
}
