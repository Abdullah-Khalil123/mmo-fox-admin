import { z } from 'zod';
import { ServiceType } from './game';

export const categorySchema = z.object({
  id: z.number().int('ID must be a number').optional(),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug is required'),
  gameId: z.number().int('Game ID must be a number').optional(),
  parentId: z.number().int().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;


export const gameSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  imageUrl: z.any(),
  translations: z
    .array(
      z.object({
        language: z.string().min(2, 'Language is required'),
        name: z.string().min(1, 'Name is required'),
        description: z.string().min(1, 'Description is required'),
      })
    )
    .min(1, 'At least one translation is required'),
});

export type GameFormData = z.infer<typeof gameSchema>;

export const serviceSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().optional(),
  imageUrl: z.any().optional(),
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
