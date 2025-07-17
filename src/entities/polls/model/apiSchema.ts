import { z } from "zod";

export const choiceSchema = z.object({
  id: z.number(),
  title: z.string(),
  created_at: z.string(),
});

export const getPollChoicesResponseSchema = z.array(choiceSchema);

export const pollsGetAllResponseSchema = z.object({
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  size: z.number(),
  items: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      is_active: z.boolean(),
      created_at: z.string(),
      date_start: z.string().nullable(),
      date_end: z.string().nullable(),
      total_questions: z.number(),
      is_completed: z.boolean(),
    }),
  ),
});

export const pollQuestionSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  order: z.number(),
  type: z.enum(["RADIO", "CHECKBOX", "SCORE"]),
  has_own_answer: z.boolean(),
  is_enps: z.boolean(),
  created_at: z.string(),
  tag: z.object({
    id: z.number(),
  }),
});

export const pollsQuestionsGetAllResponseSchema = z.array(pollQuestionSchema);

export const createAnswerRequestSchema = z.object({
  author_kan_uid: z.number().nullable(),
  own_answer: z.string().nullable(),
  choices: z.array(
    z
      .object({
        id: z.number().optional(),
        title: z.string().optional(),
      })
      .nullable(),
  ),

  question_id: z.number(),
  is_anonymous: z.boolean(),
});

const answerItemSchema = z.object({
  id: z.number(),
  author_kan_uid: z.number().nullable(),
  own_answer: z.string().nullable(),
  created_at: z.string(),
  choices: z
    .array(
      z.object({
        id: z.number(),
        title: z.string(),
        created_at: z.string(),
      }),
    )
    .nullable(),
  question_id: z.number(),
  is_anonymous: z.boolean(),
});

export const updateAnswerRequestSchema = createAnswerRequestSchema.pick({
  own_answer: true,
  choices: true,
});

export const createAnswerResponseSchema = answerItemSchema;

export const createCommentForPollQuestionRequestSchema = z.object({
  body: z.string(),
  author_kan_uid: z.number(),
  question_id: z.number(),
  tag_id: z.number(),
  is_anonymous: z.boolean(),
});

export const updateCommentRequestSchema =
  createCommentForPollQuestionRequestSchema.omit({
    question_id: true,
  });

export const createCommentForPollQuestionResponseSchema = z.object({
  id: z.number(),
  body: z.string(),
  author_kan_uid: z.number(),
  question_id: z.number(),
  tag: z.object({
    title: z.string(),
    is_active: z.boolean(),
    id: z.number(),
    created_at: z.string(),
  }),
  created_at: z.string(),
  is_anonymous: z.boolean(),
});

export const getPollCommentResponseSchema = z.object({
  items: z.array(
    z.object({
      id: z.number(),
      body: z.string(), // Здесь ответ сильно режу, ибо остальные поля вообше не нужны
    }),
  ),
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  size: z.number(),
});

export const getPollAnswersResponseSchema = z.object({
  items: z.array(answerItemSchema),
  total: z.number(),
  pages: z.number(),
  page: z.number(),
  size: z.number(),
});
