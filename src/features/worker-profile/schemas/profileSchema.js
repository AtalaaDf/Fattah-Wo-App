import { z } from 'zod';

export const workerProfileSchema = z.object({
  birth_date: z.string().optional().or(z.literal('')),
  birth_place: z.string().optional().or(z.literal('')),
  gender: z.enum(['male', 'female', '']).optional(),
  last_education: z.string().optional().or(z.literal('')),
  profile_photo_url: z.string().url('URL foto tidak valid').optional().or(z.literal('')),
  contact_email: z.string().email('Email tidak valid').optional().or(z.literal('')),
  contact_phone: z.string().min(8, 'Nomor HP minimal 8 digit').optional().or(z.literal('')),
});
