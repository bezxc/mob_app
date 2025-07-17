import { z } from "zod";

export const PostDetailCommentFormSchema = z.object({
  comment: z
    .string({ required_error: "Поле обязательно для заполнения" })
    .min(1, "Минимальное количество символов - 3"),
});

export type IPostDetailCommentFormSchemaInitialType = z.input<
  typeof PostDetailCommentFormSchema
>;
export type IPostDetailCommentFormSchemaType = z.output<
  typeof PostDetailCommentFormSchema
>;
