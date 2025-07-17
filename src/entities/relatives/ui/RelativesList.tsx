import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getRelativesByUserId } from "@/entities/profile";
import { RelativeSchemaType } from "@/entities/profile/model/schema";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { RelativeCard } from "./RelativeCard";

export const RelativesList = () => {
  const { kanUid } = useUnit($auth);
  const {
    data: childs,
    isLoading,
    isError,
    error,
  } = useQuery<RelativeSchemaType[]>({
    queryFn: () => getRelativesByUserId({ user_kan_uid: kanUid }),
    queryKey: ["relatives", { kanUid }],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Родственники</Text>

      {isError ? (
        <Text style={styles.errorText}>
          {error.message || "Произошла ошибка при загрузке данных"}
        </Text>
      ) : isLoading ? (
        <ActivityIndicator />
      ) : (
        childs && (
          <View style={styles.cardContainer}>
            {childs.map((child) => (
              <RelativeCard
                key={child.id}
                birthday={child.birthday}
                degree={child.degree}
                full_name={child.full_name}
                id={child.id}
              />
            ))}
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 22,
  },
  subTitle: {
    fontFamily: Fonts.TRegular,
    fontSize: 12,
    color: Colors.gray50,
  },
  cardContainer: {
    gap: 12,
  },
  container: {
    gap: 15,
  },
  errorText: {
    color: Colors.redAccent2,
    fontFamily: Fonts.TRegular,
    fontSize: 14,
  },
});
