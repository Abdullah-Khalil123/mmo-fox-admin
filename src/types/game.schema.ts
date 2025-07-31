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
  id: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  imageUrl: z
    .union([
      z
        .any()
        .refine(
          (val) =>
            typeof File !== 'undefined' &&
            (val instanceof File || val instanceof FileList),
          {
            message: 'Must be a File or FileList',
          }
        ),
      z.url('Must be a valid URL'),
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
  imageUrl: z
    .union([
      z
        .any()
        .refine(
          (val) =>
            typeof File !== 'undefined' &&
            (val instanceof File || val instanceof FileList),
          {
            message: 'Must be a File or FileList',
          }
        ),
      z.url('Must be a valid URL'),
    ])
    .optional(),
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

// Define enums if needed
export const CurrencyType = z.enum(['GEMS', 'COINS', 'GOLD', 'OTHER']);
export type CurrencyType = z.infer<typeof CurrencyType>;

// Price schema
export const priceSchema = z.object({
  price: z.number().min(0.01, 'Price must be at least 0.01'),
  currency: z
    .string()
    .min(1, 'Currency code is required')
    .max(3, 'Currency code must be 3 characters'),
});

// Subregion schema
export const subregionSchema = z.object({
  name: z.string().min(1, 'Subregion name is required'),
  price: z.array(priceSchema).min(1, 'At least one price is required'),
});

// Region schema
export const regionSchema = z.object({
  name: z.string().min(1, 'Region name is required'),
  subregion: z
    .array(subregionSchema)
    .min(1, 'At least one subregion is required'),
});

// Country schema
export const countrySchema = z.object({
  country: z.string().min(1, 'Country name is required'),
  region: z.array(regionSchema).min(1, 'At least one region is required'),
});

// Currency package schema
export const currencyPackageSchema = z.object({
  amount: z.number().min(1, 'Amount must be at least 1'),
  unit: z.string().min(1, 'Unit is required'),
  server: z.array(countrySchema).min(1, 'At least one country is required'),
});

// Main currency service schema
export const currencyServiceSchema = z
  .array(currencyPackageSchema)
  .min(1, 'At least one currency package is required');

// Type definitions
export type Price = z.infer<typeof priceSchema>;
export type Subregion = z.infer<typeof subregionSchema>;
export type Region = z.infer<typeof regionSchema>;
export type Country = z.infer<typeof countrySchema>;
export type CurrencyPackage = z.infer<typeof currencyPackageSchema>;
export type CurrencyServiceData = z.infer<typeof currencyServiceSchema>;
