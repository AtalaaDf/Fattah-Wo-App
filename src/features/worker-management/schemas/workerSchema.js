import { z } from 'zod';

export const addWorkerSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Nama lengkap minimal 3 karakter')
    .max(50, 'Nama lengkap maksimal 50 karakter'),
  username: z
    .string()
    .min(3, 'Username minimal 3 karakter')
    .max(20, 'Username maksimal 20 karakter')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username hanya boleh huruf, angka, dan underscore (_)'),
  password: z
    .string()
    .min(6, 'Password minimal 6 karakter'),
});
