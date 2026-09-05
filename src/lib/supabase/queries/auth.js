import { supabase } from '../client'

// Helper to construct synthetic internal email for worker role
export const getWorkerEmail = (username) => {
  const cleanUsername = username.trim().toLowerCase()
  return `${cleanUsername}@worker.fattahwo.internal`
}

/**
 * Fetch profile data for a given user ID
 */
export const fetchProfile = async (userId) => {
  if (!userId) return null
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error.message)
    return null
  }
  return data
}

/**
 * Login function for Client or Admin using email and password
 */
export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw new Error(error.message)

  const profile = await fetchProfile(data.user.id)
  return { user: data.user, session: data.session, profile }
}

/**
 * Login function for Worker using username (synthesized email) and password
 */
export const signInWorker = async (username, password) => {
  const workerEmail = getWorkerEmail(username)
  const { data, error } = await supabase.auth.signInWithPassword({
    email: workerEmail,
    password,
  })

  if (error) throw new Error('Username atau password worker salah.')

  const profile = await fetchProfile(data.user.id)
  return { user: data.user, session: data.session, profile }
}

/**
 * Client registration: creates Auth user and inserts a profile with role='client'
 */
export const signUpClient = async ({ email, password, full_name, phone }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        role: 'client',
        phone,
      },
    },
  })

  if (error) throw new Error(error.message)

  if (data?.user) {
    // Insert into public.profiles
    const { error: profileError } = await supabase.from('profiles').upsert([
      {
        id: data.user.id,
        role: 'client',
        full_name,
        email,
        phone,
        is_active: true,
      },
    ])

    if (profileError) {
      console.warn('Warning inserting profile:', profileError.message)
    }
  }

  const profile = data?.user ? await fetchProfile(data.user.id) : null
  return { user: data?.user, profile }
}

/**
 * Sign out current user
 */
export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Sign out error:', error.message)
}
