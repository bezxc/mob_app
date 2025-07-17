import { X } from "lucide-react-native";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CurrentCommentState } from "@/entities/posts";
import { ProfileInfoType } from "@/entities/profile";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface ICommentActionView {
  icon: React.ReactNode;
  user: Pick<ProfileInfoType, "full_name" | "kan_uid" | "login_ad">;
  comment: string;
  reset: () => void;
  currentState: CurrentCommentState;
}

export const CommentActionView: FC<ICommentActionView> = ({
  icon,
  user,
  comment,
  reset,
  currentState,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          flexShrink: 1,
        }}
      >
        {icon}
        <View
          style={{
            flexShrink: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.TRegular,
              color: Colors.redAccent,
              fontSize: 12,
            }}
          >
            {currentState === CurrentCommentState.Reply
              ? `Ответ пользователю ${user.full_name.split(" ")[0]} ${user.full_name.split(" ")[1]} `
              : "Редактировать комментарий"}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.TRegular,
              color: Colors.darkGray,
              fontSize: 13,
            }}
          >
            {comment}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={reset}>
        <X color={Colors.redAccent} size={30} />
      </TouchableOpacity>
    </View>
  );
};
