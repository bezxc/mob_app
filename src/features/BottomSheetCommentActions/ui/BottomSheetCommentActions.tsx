import { useUnit } from "effector-react";
import { FC } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
  useSheetPayload,
} from "react-native-actions-sheet";
import {
  $editComment,
  CurrentCommentState,
  setCurrentCommentState,
  setEditComment,
} from "@/entities/posts";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const BottomSheetCommentActions: FC<SheetProps<"comment-actions">> = ({
  sheetId,
}) => {
  const { comment_id } = useUnit($editComment);
  const setCommentState = useUnit(setCurrentCommentState);
  const setEditCommentState = useUnit(setEditComment);

  const { commentBody } = useSheetPayload("comment-actions");

  const editComment = () => {
    setCommentState({ currentState: CurrentCommentState.Edit });
    setEditCommentState({ commentBody, comment_id });
    SheetManager.hide("comment-actions");
  };

  const toggleDeleteSheet = async () => {
    await SheetManager.show("delete-comment", {
      payload: {
        id: comment_id,
      },
    });

    SheetManager.hide("comment-actions");
  };

  return (
    <ActionSheet
      isModal={false}
      id={sheetId}
      gestureEnabled
      containerStyle={{
        height: 145,
        paddingVertical: 25,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
      }}
      indicatorStyle={{
        display: "none",
      }}
    >
      <Text style={styles.title}>Выберите действие</Text>
      <View style={styles.commentWrapper}>
        <TouchableOpacity
          onPress={editComment}
          style={[styles.button, styles.cancelButton]}
        >
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.editText}>
            Редактировать
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleDeleteSheet}
          style={[styles.button, styles.submitButton]}
        >
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.deleteText}
          >
            Удалить
          </Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.TRegular,
    fontSize: 16,
    color: Colors.redAccent,
    alignSelf: "center",
    marginBottom: 20,
  },
  commentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    paddingBottom: 20,
    paddingHorizontal: 30,
  },
  button: {
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flexBasis: "50%",
  },
  submitButton: {
    backgroundColor: Colors.redAccent,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: Colors.grayLight,
  },
  deleteText: {
    fontFamily: Fonts.TBold,
    fontSize: Platform.OS === "ios" ? 15 : 13,
    color: Colors.white,
  },
  editText: {
    fontFamily: Fonts.TBold,
    fontSize: Platform.OS === "ios" ? 15 : 13,
    color: Colors.black,
  },
});
