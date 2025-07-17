import dayjs from "dayjs";
import { z } from "zod";
import { api } from "@/shared/api/baseApi";
import { GetAllApiResponseSchema } from "@/shared/schemas/api";
import {
  ActiveTagsSchema,
  PostCommentSchema,
  PostSchema,
  SinglePostSchema,
} from "../model/schema";

const NEWS_URL = process.env.EXPO_PUBLIC_NEWS_API_URL;

const PostListSchema = GetAllApiResponseSchema(PostSchema);
export type PostListType = z.infer<typeof PostListSchema>;
export type PostListItemType = z.infer<typeof PostSchema>;

export const getPostsList = ({
  order_by,
  is_pinned,
  is_published,
  page,
  size,
  tag_id__in,
}: {
  is_published: boolean;
  order_by: string;
  size?: number;
  page?: number;
  is_pinned?: boolean;
  tag_id__in?: string;
}) => {
  const queryParams = {
    page,
    tag_id__in,
    is_published,
    size,
    order_by,
    is_pinned,
  };

  const params = new URLSearchParams(
    Object.entries(queryParams).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== "") {
          acc[key] = String(value);
        }
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  return api({
    type: "private",
    method: "GET",
    path: `${NEWS_URL}/posts?${params}`,
    requestSchema: z.void(),
    responseSchema: PostListSchema,
  })();
};

export const getActualPosts = async ({
  order_by,
  is_pinned,
  is_published = true,
  page,
  size,
  tag_id__in,
}: {
  is_published?: boolean;
  order_by: string;
  size?: number;
  page?: number;
  is_pinned?: boolean;
  tag_id__in?: string;
}) => {
  const queryParams = {
    page,
    tag_id__in,
    is_published,
    size,
    order_by,
    is_pinned,
  };

  try {
    const posts = await getPostsList(queryParams);

    const actualPosts = posts.items.filter((post) =>
      dayjs(post.publication_date).isBefore(dayjs()),
    );

    return { ...posts, items: actualPosts };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPostById = async (id: string) => {
  return api({
    type: "private",
    method: "GET",
    path: `${NEWS_URL}/posts/${id}`,
    requestSchema: z.void(),
    responseSchema: SinglePostSchema,
  })();
};

export const postComment = api({
  method: "POST",
  type: "private",
  path: `${NEWS_URL}/comments`,
  requestSchema: PostCommentSchema.omit({
    created_at: true,
    id: true,
    updated_at: true,
  }),
  responseSchema: PostCommentSchema,
});

export const editComment = (id: string) =>
  api({
    method: "PATCH",
    type: "private",
    path: `${NEWS_URL}/comments/${id}`,
    requestSchema: z.object({
      body: z.string(),
    }),
    responseSchema: PostCommentSchema,
  });

export const deleteComment = async (id: number) =>
  api({
    method: "DELETE",
    type: "private",
    path: `${NEWS_URL}/comments?id=${id}`,
    requestSchema: z.void(),
    responseSchema: z.array(PostCommentSchema),
  })();

export const postView = api({
  method: "POST",
  type: "private",
  path: `${NEWS_URL}/posts/views`,
  requestSchema: z.object({
    post_id: z.number(),
    author_kan_uid: z.number(),
    app_type: z.enum(["mobile", "web"]),
    viewing_time: z.string(),
  }),
  responseSchema: z.object({
    post_id: z.number(),
    author_kan_uid: z.number(),
    app_type: z.enum(["mobile", "web"]),
    viewing_time: z.string(),
    id: z.number(),
  }),
});

export const getActiveTags = api({
  type: "private",
  method: "GET",
  path: `${NEWS_URL}/tags?is_active=true`,
  requestSchema: z.void(),
  responseSchema: ActiveTagsSchema,
});
