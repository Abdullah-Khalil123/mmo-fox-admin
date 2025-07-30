import z from 'zod';
import { userSchema } from './user.schema';

export const newsSchema = z.object({
  id: z.int().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().optional(),
  author: userSchema,
  views: z.string().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
});

export type NewsForm = z.infer<typeof newsSchema>;
