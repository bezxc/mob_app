import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { CareerCard, SharedCareerCard } from "@/entities/career-card";
import {
  getProfileInfo,
  getUserHistories,
  HistoriesResponseType,
  ProfileInfoType,
} from "@/entities/profile";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const PersonalCareer = () => {
  const { kanUid } = useUnit($auth);

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery<ProfileInfoType>({
    queryKey: ["career", { kanUid }],
    queryFn: () => getProfileInfo(kanUid),
  });

  const {
    data: histories,
    isLoading: isHistoriesLoading,
    isError: isHistoriesError,
  } = useQuery<HistoriesResponseType>({
    queryKey: ["user-histories", { kanUid }],
    queryFn: () => getUserHistories(kanUid),
  });

  return (
    <>
      <Text style={styles.title}>Карьерная история</Text>
      {isUserLoading || isHistoriesLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {user && histories && (
            <>
              <SharedCareerCard
                discount_category={user.discount_category}
                date_of_experience={user.date_of_experience}
                style={styles.sharedCareerCard}
              />
              <View style={styles.careerCardContainer}>
                {histories.map((item, index) => (
                  <CareerCard
                    key={item.kan_uid + item.date_start}
                    historyItem={item}
                    style={index === 0 && styles.activeCareerCard}
                  />
                ))}
              </View>
            </>
          )}
          {(isHistoriesError || isUserError) && (
            <Text style={styles.errorTitle}>
              Что-то пошло не так... Попробуйте позже
            </Text>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 16,
  },
  sharedCareerCard: {
    marginTop: 12,
    marginBottom: 13,
  },
  careerCardContainer: {
    gap: 15,
  },
  activeCareerCard: {
    backgroundColor: Colors.white,
    borderColor: Colors.gray30,
    borderWidth: 1,
  },
  errorTitle: {
    fontSize: 16,
    fontFamily: Fonts.TBold,
    color: Colors.redAccent,
  },
});
