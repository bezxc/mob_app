import { z } from "zod";

export const PostTagSchema = z.object({
  created_at: z.string(),
  updated_at: z.string(),
  name: z.string(),
  description: z.string(),
  author_kan_uid: z.number(),
  is_active: z.boolean(),
  id: z.number(),
});

export const PostCommentSchema = z.object({
  created_at: z.string(),
  updated_at: z.string(),
  body: z.string(),
  post_id: z.number(),
  parent_comment_id: z.number().nullable(),
  author_kan_uid: z.number(),
  id: z.number(),
});

export const PostDocSchema = z.object({
  post_id: z.number(),
  doc_key: z.string(),
});

export const PostSchema = z.object({
  created_at: z.string(),
  updated_at: z.string(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
  author_kan_uid: z.number(),
  image_key: z.string(),
  thumbnail_key: z.nullable(z.string()),
  publication_date: z.string(),
  banner_key: z.nullable(z.string()),
  tag: z.object({
    id: z.number(),
    name: z.string(),
    is_active: z.boolean(),
  }),
  is_pinned: z.boolean(),
  is_published: z.boolean(),
});

export const SinglePostSchema = PostSchema.merge(
  z.object({ comments: z.array(PostCommentSchema) }),
).merge(z.object({ docs: z.array(PostDocSchema) }));

export const PostQueryParamsSchema = z.object({
  page: z
    .number()
    .min(0)
    .default(0)
    .optional()
    .refine((val) => Number.isInteger(val), { message: "Must be an integer" }),

  size: z
    .number()
    .min(1)
    .max(100)
    .default(10)
    .optional()
    .refine((val) => Number.isInteger(val), { message: "Must be an integer" }),

  is_pinned: z.boolean().optional(),

  tag_id__in: z.string().optional(),

  order_by: z.string().optional(),
});

export const ActiveTagsSchema = z.array(PostTagSchema);

export type PostCommentType = z.infer<typeof PostCommentSchema>;
export type PostDocsType = z.infer<typeof PostDocSchema>;
export type PostType = z.infer<typeof PostSchema>;
export type ActiveTagsType = z.infer<typeof ActiveTagsSchema>;
export type SinglePostType = z.infer<typeof SinglePostSchema>;
