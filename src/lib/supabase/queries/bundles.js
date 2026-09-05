import { supabase } from '../client';

/**
 * Fetch bundles with features
 * @param {Object} options
 * @param {boolean} [options.activeOnly=false]
 * @param {string} [options.category]
 */
export async function getBundles({ activeOnly = false, category = 'all' } = {}) {
  let query = supabase
    .from('bundles')
    .select(`
      *,
      bundle_features (*)
    `)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (activeOnly) {
    query = query.eq('is_active', true);
  }

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/**
 * Create a new bundle with its features
 */
export async function createBundle(bundleData, features = [], adminId) {
  const { name, category, price, description, image_url, is_popular, is_active, display_order } = bundleData;

  const { data: newBundle, error: bundleError } = await supabase
    .from('bundles')
    .insert({
      name,
      category,
      price: parseFloat(price),
      description: description || null,
      image_url: image_url || null,
      is_popular: !!is_popular,
      is_active: is_active ?? true,
      display_order: parseInt(display_order || 0, 10),
      created_by: adminId || null,
    })
    .select()
    .single();

  if (bundleError) throw bundleError;

  if (features && features.length > 0) {
    const formattedFeatures = features.map((feat, idx) => ({
      bundle_id: newBundle.id,
      label: feat.label,
      is_included: feat.is_included ?? true,
      display_order: idx,
    }));

    const { error: featError } = await supabase
      .from('bundle_features')
      .insert(formattedFeatures);

    if (featError) throw featError;
  }

  return newBundle;
}

/**
 * Update an existing bundle and replace its features
 */
export async function updateBundle(bundleId, bundleData, features = []) {
  const { name, category, price, description, image_url, is_popular, is_active, display_order } = bundleData;

  const { data: updatedBundle, error: bundleError } = await supabase
    .from('bundles')
    .update({
      name,
      category,
      price: parseFloat(price),
      description: description || null,
      image_url: image_url || null,
      is_popular: !!is_popular,
      is_active: is_active ?? true,
      display_order: parseInt(display_order || 0, 10),
      updated_at: new Date().toISOString(),
    })
    .eq('id', bundleId)
    .select()
    .single();

  if (bundleError) throw bundleError;

  // Replace features: delete existing, then insert new ones
  await supabase.from('bundle_features').delete().eq('bundle_id', bundleId);

  if (features && features.length > 0) {
    const formattedFeatures = features.map((feat, idx) => ({
      bundle_id: bundleId,
      label: feat.label,
      is_included: feat.is_included ?? true,
      display_order: idx,
    }));

    const { error: featError } = await supabase
      .from('bundle_features')
      .insert(formattedFeatures);

    if (featError) throw featError;
  }

  return updatedBundle;
}

/**
 * Delete a bundle
 */
export async function deleteBundle(bundleId) {
  const { error } = await supabase.from('bundles').delete().eq('id', bundleId);
  if (error) throw error;
  return true;
}
