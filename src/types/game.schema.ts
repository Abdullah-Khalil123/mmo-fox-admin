import { z } from 'zod';
import { ServiceStatus, ServiceType } from './game';

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
  imageUrl: z
    .union([
      z.instanceof(FileList).refine((fileList) => fileList.length > 0),
      z.undefined(),
    ])
    .optional(),
  name: z.string().min(1, 'Name is required'),
  seo: z.array(
    z.object({
      language: z.string().min(2, 'Language is required'),
      metaTitle: z.string().min(1, 'Title is required'),
      metaDescription: z.string().min(1, 'Description is required'),
      keywords: z
        .union([
          z.string(), // comma-separated string
          z.array(z.string().min(1, 'Keyword is required')),
        ])
        .refine(
          (val) => {
            if (typeof val === 'string') return val.trim().length > 0;
            return Array.isArray(val) && val.length > 0;
          },
          { message: 'At least one keyword is required' }
        ),
      introduction: z.string().min(1, 'Introduction is required'),
    })
  ),
});

export type GameFormData = z.infer<typeof gameSchema>;

// Define ServiceType enum if not already defined

export const serviceSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug is required'),
  imageUrl: z.union([
    // For file uploads
    z.instanceof(FileList).refine((files) => files.length > 0, {
      message: 'Image is required',
    }),
    // For URL strings
    z.string().url('Image must be a valid URL').min(1, 'Image URL is required'),
  ]),
  currency: z.string().min(1, 'Currency is required'),
  vendor: z.string().min(1, 'Vendor is required'),
  status: z.enum(ServiceStatus),
  type: z.enum(ServiceType),
  categories: z
    .array(
      z.object({
        name: z.string().min(1, 'Category name is required'),
        slug: z.string().min(1, 'Category slug is required'),
      })
    )
    .optional(),
  seo: z.array(
    z.object({
      language: z.string().min(2, 'Language is required'),
      metaTitle: z.string().min(1, 'Title is required'),
      metaDescription: z.string().min(1, 'Description is required'),
      keywords: z
        .union([
          z.string(), // comma-separated string
          z.array(z.string().min(1, 'Keyword is required')),
        ])
        .refine(
          (val) => {
            if (typeof val === 'string') return val.trim().length > 0;
            return Array.isArray(val) && val.length > 0;
          },
          { message: 'At least one keyword is required' }
        ),
      introduction: z.string().min(1, 'Introduction is required'),
    })
  ),
});

export type CategoryFieldType = {
  name: string;
  slug?: string;
};

export type ServiceFormData = z.infer<typeof serviceSchema>;
