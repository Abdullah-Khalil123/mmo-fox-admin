import z from 'zod';
import { serviceSchema } from './game.schema';

export enum Role {
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
  ADMIN = 'ADMIN',
}

const userSchema = z.object({
  id: z.number(),
  email: z.email(),
  role: z.enum(Role),
  name: z.string().optional(),
  balance: z.number().nonnegative(),
  services: z.array(serviceSchema).optional(),
});
export type User = z.infer<typeof userSchema>;
