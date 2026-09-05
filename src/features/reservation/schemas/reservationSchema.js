import { z } from 'zod';

export const reservationSchema = z.object({
  full_name: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  phone: z.string().min(8, 'Nomor WA/telepon minimal 8 digit'),
  email: z.string().email('Alamat email tidak valid'),
  reservation_type: z.enum(['wedding', 'birthday', 'cultural', 'corporate', 'other']),
  bundle_id: z.string().optional().or(z.literal('')),
  event_date: z.string().min(1, 'Pilih tanggal acara/pernikahan'),
  start_time: z.string().optional().or(z.literal('')),
  end_time: z.string().optional().or(z.literal('')),
  location: z.string().min(3, 'Lokasi tempat acara wajib diisi'),
  guest_count: z.coerce.number().optional(),
  workers_needed: z.coerce.number().min(1, 'Minimal 1 worker dibutuhkan').default(2),
  notes: z.string().optional(),
});
