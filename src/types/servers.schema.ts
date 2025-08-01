import { z } from 'zod';

export const regionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  servers: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(1, 'Name is required'),
      price: z.number().min(0, 'Price must be a positive number'),
    })
  ),
});
export type RegionFormData = z.infer<typeof regionSchema>;

export const serverSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  region: z.union([regionSchema.optional(), z.null()]),
});
export type ServerFormData = z.infer<typeof serverSchema>;
