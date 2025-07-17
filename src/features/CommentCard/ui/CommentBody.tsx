import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text } from "react-native";
import Toast from "react-native-toast-message";
import { getUserByLogin, UserByLoginResponseType } from "@/entities/profile";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface CommentCardProps {
  body: string;
}

const regex = /@([a-zA-Z0-9._]+)/g;

export const CommentBody: FC<CommentCardProps> = ({ body }) => {
  const parts = body.split(regex);
  const customQuery = async () => {
    try {
      const res = await getUserByLogin({ login_ad: parts[1] });
      if (res.items.length === 0) {
        Toast.show({
          type: "error",
          text1: "Ошибка",
          text2: `Пользователь ${parts[1]} не найден`,
        });
      } else {
        router.push(`/(withoutTabs)/colleaguesInfo/${res.items[0].kan_uid}`);
      }
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { refetch } = useQuery<UserByLoginResponseType>({
    queryKey: ["check_exist_user", { key: parts[1] }],
    queryFn: customQuery,
    enabled: false,
  });

  const handleUsernamePress = async () => {
    await refetch();
  };

  return (
    <Text style={styles.commentText}>
      {parts.map((part: string, index: number) => {
        if (index % 2 === 1) {
          return (
            <Text
              key={index}
              onPress={handleUsernamePress}
              style={styles.emailHighlithgt}
            >
              @{part}
            </Text>
          );
        }

        return <Text key={index}>{part}</Text>;
      })}
    </Text>
  );
};

const styles = StyleSheet.create({
  commentText: {
    color: Colors.darkGray,
    fontSize: 14,
    fontFamily: Fonts.TRegular,
    maxWidth: "80%",
  },
  emailHighlithgt: {
    color: Colors.redAccent,
  },
});
