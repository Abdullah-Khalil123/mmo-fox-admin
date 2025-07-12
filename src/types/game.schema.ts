import { z } from 'zod';
import { ServiceType } from './game';
import { sl } from 'zod/v4/locales';

export const gameSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug is required'),
  imageUrl: z.url('Must be a valid URL').optional(),
});

export type GameFormData = z.infer<typeof gameSchema>;

export const serviceSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().optional(),
  imageUrl: z.string().url('Must be a valid URL').optional(),
  basePrice: z
    .number()
    .min(0, 'Base price must be a positive number')
    .or(
      z.string().regex(/^\d+(\.\d{1,2})?$/, 'Base price must be a valid number')
    ),
  currency: z.string().min(1, 'Currency is required'),
  published: z.boolean().optional(),
  type: z
    .nativeEnum(ServiceType, {
      message: 'Invalid service type',
    })
    .optional(),
});
export type ServiceFormData = z.infer<typeof serviceSchema>;

export const categorySchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug is required'),
  gameId: z.number().int('Game ID must be a number'),
  parentId: z.number().int().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
