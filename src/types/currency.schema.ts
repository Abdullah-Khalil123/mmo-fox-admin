import { z } from 'zod';
import { serverSchema } from './servers.schema';

// your schema
export const presetsSchema = z.object({
  id: z.string().optional(),
  amount: z.number().min(0, 'Amount must be a positive number'),
});

export type PresetsSchemaFormData = z.infer<typeof presetsSchema>;

export const currencyServiceConfigSchema = z.object({
  id: z.string().optional(),
  serviceId: z.string().min(1, 'Service ID is required'),
  amount: z.number().min(0, 'Amount must be a positive number'),
  unit: z.string().min(1, 'Unit is required'),
  presets: z.array(presetsSchema),
  servers: z.array(serverSchema),
});

export type CurrencyConfigFormData = z.infer<
  typeof currencyServiceConfigSchema
>;
