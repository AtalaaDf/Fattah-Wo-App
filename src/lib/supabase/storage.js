import { supabase } from './client'

/**
 * Upload a file to a Supabase Storage bucket.
 * Returns the public URL of the uploaded file.
 *
 * Path conventions (required for RLS policies to work):
 *   avatars/{userId}/filename.jpg
 *   bundle-images/{bundleId}/filename.jpg
 *   payment-proofs/{reservationId}/filename.jpg
 *
 * @param {Object} params
 * @param {'avatars'|'bundle-images'|'payment-proofs'} params.bucket
 * @param {string} params.folder - The ID prefix (userId, bundleId, or reservationId)
 * @param {File} params.file - The File object from an <input type="file">
 * @param {string} [params.filename] - Override filename; defaults to original file name
 * @returns {Promise<string>} Public URL of the uploaded file
 */
export async function uploadFile({ bucket, folder, file, filename }) {
  const ext = file.name.split('.').pop()
  const safeName = filename ? `${filename}.${ext}` : `${Date.now()}.${ext}`
  const path = `${folder}/${safeName}`

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true, cacheControl: '3600' })

  if (uploadError) throw uploadError

  // payment-proofs is private — return the path, NOT a signed URL.
  // The signed URL will be generated on-the-fly by the viewer (Admin) later.
  if (bucket === 'payment-proofs') {
    return path
  }

  // avatars and bundle-images are public
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

/**
 * Upload worker or client avatar photo
 * Path: avatars/{userId}/avatar.{ext}
 */
export async function uploadAvatar(userId, file) {
  return uploadFile({ bucket: 'avatars', folder: userId, file, filename: 'avatar' })
}

/**
 * Upload bundle cover image (admin only)
 * Path: bundle-images/{bundleId}/cover.{ext}
 */
export async function uploadBundleImage(bundleId, file) {
  return uploadFile({ bucket: 'bundle-images', folder: bundleId, file, filename: 'cover' })
}

/**
 * Upload payment proof photo (client)
 * Path: payment-proofs/{reservationId}/{timestamp}.{ext}
 * Returns the storage path to be saved in the database.
 */
export async function uploadPaymentProof(reservationId, file) {
  return uploadFile({ bucket: 'payment-proofs', folder: reservationId, file })
}

/**
 * Get a fresh signed URL for a private payment-proof file (admin viewing client photo)
 * @param {string} path - Storage path e.g. "{reservationId}/filename.jpg"
 * @param {number} [expiresIn=3600] - Seconds until URL expires
 */
export async function getPaymentProofSignedUrl(path, expiresIn = 3600) {
  const { data, error } = await supabase.storage
    .from('payment-proofs')
    .createSignedUrl(path, expiresIn)
  if (error) throw error
  return data.signedUrl
}
