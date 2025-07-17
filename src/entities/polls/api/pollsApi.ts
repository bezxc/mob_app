import { z } from "zod";
import { api } from "@/shared/api/baseApi";
import { IGetAllQueryParams } from "@/shared/types/types";
import {
  createAnswerRequestSchema,
  createAnswerResponseSchema,
  createCommentForPollQuestionRequestSchema,
  createCommentForPollQuestionResponseSchema,
  getPollAnswersResponseSchema,
  getPollChoicesResponseSchema,
  getPollCommentResponseSchema,
  pollsGetAllResponseSchema,
  pollsQuestionsGetAllResponseSchema,
  updateAnswerRequestSchema,
  updateCommentRequestSchema,
} from "../model/apiSchema";

const POLLS_URL = process.env.EXPO_PUBLIC_POLLS_API_URL;

interface IGetPollsListQueryParams extends IGetAllQueryParams {
  kan_uid: string;
  division_guid: string;
  position_guid: string;
}

interface IGetPollQuestionsFnArgs {
  pollId: string;
}

interface IGetPollChoicesFnArgs {
  questionId: string;
}

interface IGetPollAnswersFnArgs {
  question_id: string;
  author_kan_uid: string;
}

export const getPollsList = async ({
  page,
  size,
  order_by,
  kan_uid,
  position_guid,
  division_guid,
}: IGetPollsListQueryParams) => {
  const params = new URLSearchParams();

  if (page) {
    params.append("page", String(page));
  }
  if (kan_uid) {
    params.append("kan_uid", kan_uid);
  }
  if (position_guid) {
    params.append("position_guid", position_guid);
  }
  if (division_guid) {
    params.append("division_guid", division_guid);
  }
  if (size) {
    params.append("size", String(size));
  }
  if (order_by) {
    params.append("order_by", String(order_by));
  }

  return api({
    type: "private",
    method: "GET",
    path: `${POLLS_URL}/polls/completed?${params}`,
    requestSchema: z.void(),
    responseSchema: pollsGetAllResponseSchema,
  })();
};

export const getPollQuestions = async ({ pollId }: IGetPollQuestionsFnArgs) => {
  return api({
    type: "private",
    method: "GET",
    path: `${POLLS_URL}/questions/poll/${pollId}`,
    requestSchema: z.void(),
    responseSchema: pollsQuestionsGetAllResponseSchema,
  })();
};

export const getPollAnswers = async ({
  question_id,
  author_kan_uid,
}: IGetPollAnswersFnArgs) => {
  const params = new URLSearchParams();
  if (author_kan_uid) {
    params.append("author_kan_uid", String(author_kan_uid));
  }
  if (question_id) {
    params.append("question_id", String(question_id));
  }
  return api({
    type: "private",
    method: "GET",
    path: `${POLLS_URL}/answers?${params}`,
    requestSchema: z.void(),
    responseSchema: getPollAnswersResponseSchema,
  })();
};

export const getPollChoices = async ({ questionId }: IGetPollChoicesFnArgs) => {
  return api({
    type: "private",
    method: "GET",
    path: `${POLLS_URL}/choices/question/${questionId}`,
    requestSchema: z.void(),
    responseSchema: getPollChoicesResponseSchema,
  })();
};

export const getPollComment = async ({
  author_kan_uid,
  question_id,
}: IGetPollAnswersFnArgs) => {
  const params = new URLSearchParams();
  if (author_kan_uid) {
    params.append("author_kan_uid", String(author_kan_uid));
  }
  if (question_id) {
    params.append("question_id", String(question_id));
  }
  return api({
    type: "private",
    method: "GET",
    path: `${POLLS_URL}/comments?${params}`,
    requestSchema: z.void(),
    responseSchema: getPollCommentResponseSchema,
  })();
};

export const createAnswerForPollQuestion = api({
  type: "private",
  method: "POST",
  path: `${POLLS_URL}/answers`,
  requestSchema: createAnswerRequestSchema,
  responseSchema: createAnswerResponseSchema,
});

export const updateAnswerForPollQuestion = ({
  answerId,
}: {
  answerId: string;
}) =>
  api({
    type: "private",
    method: "PATCH",
    path: `${POLLS_URL}/answers/${answerId}`,
    requestSchema: updateAnswerRequestSchema,
    responseSchema: createAnswerResponseSchema,
  });

export const createCommentForPollQuestion = api({
  type: "private",
  method: "POST",
  path: `${POLLS_URL}/comments`,
  requestSchema: createCommentForPollQuestionRequestSchema,
  responseSchema: createCommentForPollQuestionResponseSchema,
});

export const updateCommentForPollQuestion = ({
  commentId,
}: {
  commentId: string;
}) =>
  api({
    type: "private",
    method: "PATCH",
    path: `${POLLS_URL}/comments/${commentId}`,
    requestSchema: updateCommentRequestSchema,
    responseSchema: createCommentForPollQuestionResponseSchema,
  });

export const deleteCommentForPollQuestion = ({
  commentId,
}: {
  commentId: string;
}) =>
  api({
    type: "private",
    method: "DELETE",
    path: `${POLLS_URL}/comments/${commentId}`,
    requestSchema: z.void(),
    responseSchema: createCommentForPollQuestionResponseSchema,
  })();
