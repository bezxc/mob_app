import { useFocusEffect } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useUnit } from "effector-react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { NestedHeaderWithShare } from "@/entities/nested-header";
import { getPostById, postView, SinglePostType } from "@/entities/posts";
import { PostDetailCommentForm } from "@/features/PostDetailCommentForm";
import { $auth } from "@/shared/api/auth.store";
import { Colors } from "@/shared/styles/tokens";
import { PostDetailComments } from "@/widgets/PostDetailComments";
import { PostDetailDocuments } from "@/widgets/PostDetailDocuments";
import { PostDetailMainContent } from "@/widgets/PostDetailMainContent";

const PostDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { kanUid } = useUnit($auth);

  const {
    data: post,
    isLoading,
    refetch: refetchPost,
  } = useQuery<SinglePostType>({
    queryKey: ["post", { id }],
    queryFn: () => getPostById(id || ""),
  });

  const { mutate: postViewMutation } = useMutation({
    mutationFn: () =>
      postView({
        app_type: "mobile",
        author_kan_uid: Number(kanUid),
        post_id: Number(id),
        viewing_time: dayjs().toISOString(),
      }),

    onError: (e) => {
      Toast.show({
        type: "error",
        text1: "Возникла ошибка, пожалуйста, попробуйте позже",
      });
      console.log(e);
    },
  });

  useFocusEffect(
    useCallback(() => {
      postViewMutation();
    }, [id]),
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: Colors.white },
          headerShown: true,
          header: (props) => (
            <NestedHeaderWithShare
              boldHeader
              headerTitle="Новости"
              {...props}
            />
          ),
        }}
      />

      {isLoading || !post ? (
        <ActivityIndicator />
      ) : (
        <>
          <ScrollView
            style={[styles.container]}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetchPost} />
            }
          >
            <>
              <PostDetailMainContent
                title={post.title}
                image={post.image_key}
                description={post.body}
                tag={post.tag.name}
              />
              {post.docs.length > 0 && (
                <PostDetailDocuments documents={post.docs} />
              )}
              <View />
              <PostDetailComments comments={post.comments} />
            </>
          </ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
            style={{
              bottom: 0,
              left: 0,
              width: "100%",
            }}
          >
            <PostDetailCommentForm id={post.id} />
          </KeyboardAvoidingView>
        </>
      )}
    </>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexGrow: 1,
    paddingBottom: 20,
  },
});
