import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { Pen, Reply, Send } from "lucide-react-native";
import { FC, useEffect, useRef } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  $currentComment,
  $editComment,
  $replyComment,
  CurrentCommentState,
  PostType,
  resetCurrentCommentState,
  useAddComment,
  useEditComment,
} from "@/entities/posts";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { ControlledInput } from "@/shared/ui";
import {
  IPostDetailCommentFormSchemaInitialType,
  IPostDetailCommentFormSchemaType,
  PostDetailCommentFormSchema,
} from "../model/PostDetailCommentForm.schema.";
import { CommentActionView } from "./CommentActionView";

type PostDetailCommentFormProps = Pick<PostType, "id">;

export const PostDetailCommentForm: FC<PostDetailCommentFormProps> = ({
  id,
}) => {
  const methods = useForm<
    IPostDetailCommentFormSchemaInitialType,
    unknown,
    IPostDetailCommentFormSchemaType
  >({
    resolver: zodResolver(PostDetailCommentFormSchema),
    values: {
      comment: "",
    },
  });

  useSafeAreaInsets();

  const inputRef = useRef<TextInput>(null);
  const { kanUid } = useUnit($auth);

  const { currentState } = useUnit($currentComment);
  const { user, parent_comment_id, commentToReply } = useUnit($replyComment);
  const { comment_id, commentBody } = useUnit($editComment);

  const resetCommentState = useUnit(resetCurrentCommentState);

  const { handleSubmit, reset, control } = methods;
  const watchComment = useWatch({ name: "comment", control });

  const resetCommentField = () => {
    reset({ comment: "" });
    resetCommentState();
  };

  const { mutate: addNewCommentByPostId } = useAddComment(resetCommentField);
  const { mutate: editCommentById } = useEditComment(resetCommentField);

  useEffect(() => {
    return () => resetCommentField();
  }, []);

  useEffect(() => {
    if (currentState === CurrentCommentState.Edit) {
      reset({ comment: commentBody });
    }

    if (currentState === CurrentCommentState.Reply) {
      reset({ comment: `@${user.login_ad} ` });
    }

    if (currentState !== CurrentCommentState.Post) {
      inputRef.current?.focus();
    }
  }, [currentState, user, reset, commentBody]);

  const onSubmit: SubmitHandler<IPostDetailCommentFormSchemaType> = async (
    newData,
  ) => {
    const comment = newData.comment.trim();

    if (currentState === CurrentCommentState.Reply) {
      addNewCommentByPostId({
        author_kan_uid: Number(kanUid),
        body: comment,
        post_id: Number(id),
        parent_comment_id: parent_comment_id || Number(id),
      });
    }
    if (currentState === CurrentCommentState.Edit) {
      editCommentById({
        id: String(comment_id),
        body: comment,
      });
    }

    if (currentState === CurrentCommentState.Post) {
      addNewCommentByPostId({
        author_kan_uid: Number(kanUid),
        body: comment,
        post_id: Number(id),
        parent_comment_id: null,
      });
    }

    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        {currentState === CurrentCommentState.Edit ||
        currentState === CurrentCommentState.Reply ? (
          <CommentActionView
            icon={
              currentState === CurrentCommentState.Edit ? (
                <Pen size={30} color={Colors.redAccent} />
              ) : (
                <Reply size={30} color={Colors.redAccent} />
              )
            }
            currentState={currentState}
            comment={
              currentState === CurrentCommentState.Edit
                ? commentBody
                : commentToReply
            }
            user={user}
            reset={resetCommentField}
          />
        ) : (
          <Text style={styles.title}> Добавить комментарий</Text>
        )}
        <View style={styles.commentWrapper}>
          <ControlledInput
            ref={inputRef}
            inputMode="text"
            showSoftInputOnFocus
            name="comment"
            placeholderTextColor={Colors.gray50}
            placeholder="Ваш комментарий"
            withError={false}
            scrollEnabled={false}
            multiline
            inputStyle={{
              fontFamily: Fonts.TRegular,
              paddingVertical: 0,
            }}
            style={{
              flex: 1,
              paddingVertical: 8,
              borderColor: Colors.gray50,
              borderRadius: 16,
            }}
          />
          <TouchableOpacity
            disabled={watchComment.trim().length === 0}
            onPress={handleSubmit(onSubmit)}
          >
            <Send
              size={27}
              color={
                watchComment.trim().length === 0
                  ? Colors.gray70
                  : Colors.redAccent
              }
            />
          </TouchableOpacity>
        </View>
      </FormProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    paddingHorizontal: 18,
    paddingVertical: 8,
    elevation: 9,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  title: {
    fontFamily: Fonts.TRegular,
    fontSize: 16,
    color: Colors.redAccent,
  },
  commentWrapper: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingBottom: 30,
  },
});
