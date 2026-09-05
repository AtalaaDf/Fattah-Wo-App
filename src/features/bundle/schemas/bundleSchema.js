import { z } from 'zod';

export const bundleSchema = z.object({
  name: z.string().min(3, 'Nama bundle minimal 3 karakter'),
  category: z.enum(['wedding', 'birthday', 'cultural', 'corporate'], {
    errorMap: () => ({ message: 'Pilih kategori bundle yang valid' }),
  }),
  price: z.coerce.number().min(0, 'Harga tidak boleh negatif'),
  description: z.string().optional(),
  image_url: z.string().url('URL gambar tidak valid').optional().or(z.literal('')),
  is_popular: z.boolean().default(false),
  is_active: z.boolean().default(true),
  display_order: z.coerce.number().default(0),
});
