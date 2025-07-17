import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SinglePostType } from "@/entities/posts";
import { CommentCard } from "@/features/CommentCard";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const PostDetailComments: FC<Pick<SinglePostType, "comments">> = ({
  comments,
}) => {
  const renderChildComments = (parentId: number) =>
    comments
      .filter((comment) => comment.parent_comment_id === parentId)
      .map((comment) => (
        <View
          key={comment.id}
          style={[styles.childComment, styles.commentCard]}
        >
          <CommentCard {...comment} />
        </View>
      ));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Комментарии</Text>
      {comments.length > 0 ? (
        comments
          .filter((comment) => !comment.parent_comment_id)
          .map((comment) => (
            <View key={comment.id} style={styles.commentCard}>
              <CommentCard {...comment} />
              {renderChildComments(comment.id)}
            </View>
          ))
      ) : (
        <Text style={styles.notFound}>Нет комментариев</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    gap: 12,
    paddingHorizontal: 18,
    flex: 1,
  },
  title: {
    fontFamily: Fonts.TRegular,
    fontSize: 16,
    color: Colors.redAccent,
  },
  notFound: {
    fontFamily: Fonts.TRegular,
    fontSize: 16,
    color: Colors.gray50,
    textAlign: "center",
  },
  childComment: {
    paddingLeft: 52,
  },
  commentCard: {
    marginTop: 12,
  },
});
