import { z } from 'zod'

export const loginSchema = z.object({
  role: z.enum(['client', 'worker', 'admin'], {
    required_error: 'Pilih role login terlebih dahulu.',
  }),
  identifier: z
    .string()
    .min(1, 'Email / Username wajib diisi.'),
  password: z
    .string()
    .min(6, 'Password minimal 6 karakter.'),
})

export const clientRegisterSchema = z
  .object({
    full_name: z
      .string()
      .min(3, 'Nama lengkap minimal 3 karakter.'),
    email: z
      .string()
      .email('Format email tidak valid.'),
    phone: z
      .string()
      .min(8, 'Nomor telepon / WA minimal 8 digit.')
      .regex(/^[0-9+\-\s()]+$/, 'Format nomor telepon tidak valid.'),
    password: z
      .string()
      .min(6, 'Password minimal 6 karakter.'),
    confirmPassword: z
      .string()
      .min(6, 'Konfirmasi password minimal 6 karakter.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok dengan password.',
    path: ['confirmPassword'],
  })
