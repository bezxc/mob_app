import { FC } from "react";
import {
  LayoutAnimation,
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
import { useDeleteComment } from "@/entities/posts";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const BottomSheetDeleteComment: FC<SheetProps<"delete-comment">> = ({
  sheetId,
}) => {
  const { mutate: deleteCommentById } = useDeleteComment();

  const { id } = useSheetPayload("delete-comment");

  const layoutAnimConfig = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  const onSubmit = () => {
    if (id) {
      deleteCommentById({ id });
    }
    SheetManager.hide("delete-comment");
    LayoutAnimation.configureNext(layoutAnimConfig);
  };

  return (
    <ActionSheet
      isModal={false}
      id={sheetId}
      containerStyle={{
        height: 145,
        paddingVertical: 25,
        alignItems: "center",
        justifyContent: "center",
      }}
      indicatorStyle={{
        display: "none",
      }}
    >
      <Text style={styles.title}>Удалить комментарий?</Text>
      <View style={styles.commentWrapper}>
        <TouchableOpacity
          onPress={() => SheetManager.hide("delete-comment")}
          style={[styles.button, styles.cancelButton]}
        >
          <Text style={styles.cancelText}>Отмена</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSubmit}
          style={[styles.button, styles.submitButton]}
        >
          <Text style={styles.submitText}>Удалить</Text>
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
    marginBottom: 20,
    paddingHorizontal: 20,
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
  submitText: {
    fontFamily: Fonts.TBold,
    fontSize: 15,
    color: Colors.white,
  },
  cancelText: {
    fontFamily: Fonts.TBold,
    fontSize: 15,
    color: Colors.black,
  },
});
