import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { PreparePostComment } from "@/shared/types/types";
import { deleteComment, editComment, postComment } from "./posts";

export const useEditComment = (onSuccessFn: () => void) => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: ({ id, body }: { id: string; body: string }) =>
      editComment(id)({ body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      onSuccessFn();
    },
    onError: (e) => {
      Toast.show({
        type: "error",
        text1: "Возникла ошибка, пожалуйста, попробуйте позже",
      });
      console.log(e);
    },
  });

  return { mutate, isSuccess, isPending };
};

export const useReplyComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: ({
      author_kan_uid,
      body,
      post_id,
      parent_comment_id,
    }: PreparePostComment) =>
      postComment({
        author_kan_uid,
        body,
        post_id,
        parent_comment_id,
      }),
    onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      console.log(e);
    },
    onError: (e) => {
      Toast.show({
        type: "error",
        text1: "Возникла ошибка, пожалуйста, попробуйте позже",
      });
      console.log(e);
    },
  });

  return { mutate, isSuccess, isPending };
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteComment(id),
    onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      console.log(e);
    },
    onError: (e) => {
      Toast.show({
        type: "error",
        text1: "Возникла ошибка, пожалуйста, попробуйте позже",
      });
      console.log(e);
    },
  });

  return { mutate, isSuccess, isPending };
};

export const useAddComment = (onSuccessFn: () => void) => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: ({
      author_kan_uid,
      body,
      post_id,
      parent_comment_id,
    }: PreparePostComment) => {
      return postComment({
        author_kan_uid,
        body,
        post_id,
        parent_comment_id,
      });
    },

    onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      onSuccessFn();
    },
    onError: (e) => {
      Toast.show({
        type: "error",
        text1: "Возникла ошибка, пожалуйста, попробуйте позже",
      });
      console.log(e);
    },
  });

  return { mutate, isSuccess, isPending };
};
