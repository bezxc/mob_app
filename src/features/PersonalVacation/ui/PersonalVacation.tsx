import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { StyleSheet, Text, View } from "react-native";
import { getProfileInfo, ProfileInfoType } from "@/entities/profile";
import { VacationCard } from "@/entities/vacation-card";
import { $auth } from "@/shared/api/auth.store";
import { Fonts } from "@/shared/styles/tokens";
import { Skeleton } from "@/shared/ui";

export const PersonalVacation = () => {
  const { kanUid } = useUnit($auth);

  const { data } = useQuery<ProfileInfoType>({
    queryKey: ["vacation", { kanUid }],
    queryFn: () => getProfileInfo(String(kanUid)),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мой отпуск</Text>

      <View style={styles.cardContainer}>
        {data ? (
          <>
            <VacationCard
              amountText={data.rest_of_vacation}
              description="Остаток отпуска"
            />
            <VacationCard
              amountText={data.planned_vacation}
              description="Запланированный отпуск"
            />
          </>
        ) : (
          <Skeleton isLoading />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 22,
  },
  cardContainer: {
    gap: 10,
    flex: 1,
    flexDirection: "row",
    marginTop: 12,
  },
});
