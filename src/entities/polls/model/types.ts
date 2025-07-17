import { z } from "zod";
import { IRadioItem } from "@/shared/types/types";
import {
  choiceSchema,
  createAnswerRequestSchema,
  createAnswerResponseSchema,
  pollQuestionSchema,
  pollsQuestionsGetAllResponseSchema,
  updateAnswerRequestSchema,
  updateCommentRequestSchema,
} from "./apiSchema";

export interface IAnswer {
  questionId: string;
  answer: string | string[];
  comment: string;
}

export type ICurrentAnswer = Omit<IAnswer, "comment">;

export type IStatus = "anon" | "deanon";

export interface IExampleQuestion {
  id: number;
  type: "radio" | "checkbox" | "rating";
  title: string;
  variants: IRadioItem[];
}

export interface IQuizInitialState {
  stage: number;
  currentQuestion: number;
  currentAnswer: ICurrentAnswer | null;
  answers: IAnswer[];
  status: IStatus;
}

export type IPollQuestion = z.infer<typeof pollQuestionSchema>;
export type IPollQuestions = z.infer<typeof pollsQuestionsGetAllResponseSchema>;
export interface IPollAnswer {
  id?: number;
  title?: string;
}

export type ICreateAnswer = z.infer<typeof createAnswerRequestSchema>;

export type IPollsChoice = z.infer<typeof choiceSchema>;

export type IPollsResponseAnswer = z.infer<typeof createAnswerResponseSchema>;

export type IPollsUpdateAnswerBody = z.infer<typeof updateAnswerRequestSchema>;

export type IPollsUpdateCommentBody = z.infer<
  typeof updateCommentRequestSchema
>;

export interface IPollsGetCommentById {
  id: number;
  body: string;
}
