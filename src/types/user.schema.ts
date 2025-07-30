import z from 'zod';

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
  ADMIN = 'ADMIN',
}

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.email(),
  password: z.string().min(6).optional(),
  role: z.enum(UserRole),
  balance: z.number().nonnegative().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
