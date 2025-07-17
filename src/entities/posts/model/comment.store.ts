import { createEvent, createStore } from "effector";
import { ProfileInfoType } from "@/entities/profile";

export enum CurrentCommentState {
  Post,
  Reply,
  Edit,
}

export interface ICurrentCommentState {
  currentState: CurrentCommentState;
}

export interface IEditComment {
  comment_id: number | null;
  commentBody: string | "";
}

export interface IReplyComment {
  user: Pick<ProfileInfoType, "full_name" | "login_ad" | "kan_uid">;
  parent_comment_id: number | null;
  commentToReply: string;
}

export const setCurrentCommentState = createEvent<ICurrentCommentState>();
export const setReplyComment = createEvent<IReplyComment>();
export const setEditComment = createEvent<IEditComment>();

export const resetCurrentCommentState = createEvent();
export const resetReplyComment = createEvent();
export const resetEditComment = createEvent();

const currentCommentInitialState = {
  currentState: CurrentCommentState.Post,
};

const replyCommentInitialState = {
  user: {
    full_name: "",
    kan_uid: 0,
    login_ad: "",
  },
  commentToReply: "",
  parent_comment_id: null,
};

const editCommentIntialState = {
  comment_id: null,
  commentBody: "",
};

export const $currentComment = createStore<ICurrentCommentState>(
  currentCommentInitialState,
);
export const $replyComment = createStore<IReplyComment>(
  replyCommentInitialState,
);
export const $editComment = createStore<IEditComment>(editCommentIntialState);

$currentComment
  .on(setCurrentCommentState, (state, currentState) => ({
    ...currentState,
  }))
  .reset(resetCurrentCommentState);

$replyComment
  .on(setReplyComment, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .reset(resetReplyComment);

$editComment
  .on(setEditComment, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .reset(resetEditComment);
