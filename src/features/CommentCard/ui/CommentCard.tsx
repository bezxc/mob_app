import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { router } from "expo-router";
import { EllipsisVertical } from "lucide-react-native";
import { FC } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import Toast from "react-native-toast-message";
import { AvatarImage } from "@/entities/avatar-image";
import {
  CurrentCommentState,
  PostCommentType,
  setCurrentCommentState,
  setEditComment,
  setReplyComment,
} from "@/entities/posts";
import { getProfileInfo, ProfileInfoType } from "@/entities/profile";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { formatDateWithTime } from "@/shared/utils";
import { CommentBody } from "./CommentBody";

export const CommentCard: FC<PostCommentType> = ({
  body,
  author_kan_uid,
  created_at,
  id,
  parent_comment_id,
}) => {
  const date = formatDateWithTime(created_at, "commentCard");
  const {
    data: profileInfo,
    isSuccess,
    isLoading,
    error,
  } = useQuery<ProfileInfoType>({
    queryKey: ["profile", { author_kan_uid }],
    queryFn: () => getProfileInfo(String(author_kan_uid)),
  });
  const { kanUid } = useUnit($auth);
  const setCommentState = useUnit(setCurrentCommentState);
  const setReplyState = useUnit(setReplyComment);
  const setEditCommentState = useUnit(setEditComment);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !isSuccess) {
    Toast.show({
      type: "error",
      text1: "Ошибка",
      text2: error?.message,
    });

    return;
  }

  const replyComment = () => {
    setCommentState({
      currentState: CurrentCommentState.Reply,
    });
    setReplyState({
      parent_comment_id: parent_comment_id || id,
      commentToReply: body,
      user: {
        full_name: profileInfo.full_name,
        kan_uid: profileInfo.kan_uid,
        login_ad: profileInfo.login_ad,
      },
    });
  };

  const editComment = () => {
    setEditCommentState({
      comment_id: id,
      commentBody: body,
    });
  };

  const showCommentActionsSheet = () => {
    editComment();
    SheetManager.show("comment-actions", {
      payload: {
        commentBody: body,
      },
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable
          onPress={() =>
            router.push(`/(withoutTabs)/colleaguesInfo/${author_kan_uid}`)
          }
        >
          <AvatarImage
            full_name={profileInfo.full_name}
            kan_uid={author_kan_uid}
            imageStyle={styles.image}
          />
        </Pressable>
        <View style={styles.textContainer}>
          <View style={styles.textHeader}>
            <Text style={styles.title}>
              {profileInfo.full_name.split(" ")[0]}{" "}
              {profileInfo.full_name.split(" ")[1]}
            </Text>
          </View>
          <CommentBody body={body} />
          <View style={styles.commentControls}>
            <Text style={styles.date}>{date}</Text>
            <TouchableOpacity onPress={replyComment} style={styles.replyButton}>
              <Text style={styles.replyButtonText}>Ответить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {author_kan_uid === Number(kanUid) && (
        <TouchableOpacity
          style={{
            padding: 5,
            position: "absolute",
            top: 0,
            right: 0,
          }}
          onPress={showCommentActionsSheet}
        >
          <EllipsisVertical color={Colors.redAccent} />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 14,
    flex: 1,
  },
  commentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    borderRadius: 24,
    width: 48,
    height: 48,
  },
  initials: {
    fontSize: 18,
    fontFamily: Fonts.TBold,
  },
  textContainer: {
    gap: 5,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.TBold,
  },
  date: {
    color: Colors.gray,
    fontSize: 11,
    fontFamily: Fonts.TRegular,
  },
  commentControls: {
    flexDirection: "row",
    gap: 12,
  },
  replyButton: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  replyButtonText: {
    fontSize: 11,
    fontFamily: Fonts.TBold,
    color: Colors.gray70,
  },
  commentIcon: {
    width: 15,
    height: 15,
  },
  commentText: {
    color: Colors.darkGray,
    fontSize: 14,
    fontFamily: Fonts.TRegular,
    maxWidth: "80%",
  },
  textHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
  },
  commentMenu: {
    gap: 15,
    borderRadius: 8,
    position: "absolute",
    right: 25,
    top: 15,
    borderTopRightRadius: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 150,
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  editText: {
    fontSize: 14,
  },
  deleteText: {
    fontSize: 14,
    color: Colors.redAccent,
  },
});
