import z from 'zod';
import { userSchema } from './user.schema';

enum NewsType {
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  NEWS = 'NEWS',
  NOTICE = 'NOTICE',
  UPDATE = 'UPDATE',
  GUIDE = 'GUIDE',
  EVENT = 'EVENT',
  OTHER = 'OTHER',
}

export const newsSchema = z.object({
  id: z.int().optional(),
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
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
  author: userSchema.optional(),
  views: z.string().optional(),
  type: z.enum(NewsType),
  gameId: z.string().optional(),
  published: z.boolean().default(true),
  isPinned: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
});

export type NewsForm = z.infer<typeof newsSchema>;
