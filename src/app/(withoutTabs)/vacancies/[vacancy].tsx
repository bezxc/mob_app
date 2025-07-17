import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import * as Linking from "expo-linking";
import { router, useLocalSearchParams } from "expo-router";
import { Layers, MapPin, Users, Wallet } from "lucide-react-native";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  getVacancyInfo,
  getVacancyResponses,
  getVacancySalary,
} from "@/entities/vacancies";
import { VacancyInfoList } from "@/features/VacancyInfoList";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { GradientButton } from "@/shared/ui";

function formatWithCommas(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+\b)/g, " ");
}

const VacancyPage = () => {
  const { vacancy: vacancyGuidParam } = useLocalSearchParams();
  const { kanUid } = useUnit($auth);

  const { data: vacansyResponses, isLoading: isVacancyResponsesLoading } =
    useQuery({
      queryKey: ["vacancyResponses", vacancyGuidParam],
      queryFn: () =>
        getVacancyResponses({
          guid: vacancyGuidParam as string,
          resume_user_kan_uid: kanUid,
        }),
    });

  const { data: vacancyInfo, isLoading: isVacancyInfoLoading } = useQuery({
    queryKey: ["vacancy", vacancyGuidParam],
    queryFn: () => getVacancyInfo(vacancyGuidParam as string),
  });

  if (isVacancyInfoLoading) {
    return <ActivityIndicator />;
  }

  if (vacancyInfo?.is_active === false) {
    return (
      <View style={styles.noVacancyContainer}>
        <Layers size={58} color={Colors.redAccent} strokeWidth={1} />
        <Text style={styles.noVacancyText}>Вакансия снята с публикации</Text>
      </View>
    );
  }

  return !vacancyInfo ? (
    <ActivityIndicator />
  ) : (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <View style={styles.cardsContainer}>
        <View style={styles.cardContainer}>
          <Wallet
            width={25}
            height={25}
            color={Colors.redAccent}
            strokeWidth={1}
          />
          <Text style={styles.cardInfo}>
            {getVacancySalary({
              from: formatWithCommas(vacancyInfo.avg_wage_from),
              to: formatWithCommas(vacancyInfo.avg_wage_to),
            })}
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <MapPin
            width={25}
            height={25}
            color={Colors.redAccent}
            strokeWidth={1}
          />
          <Text style={styles.cardInfo}>{vacancyInfo.department_name}</Text>
        </View>
        <View style={styles.cardContainer}>
          <Users
            width={25}
            height={25}
            color={Colors.redAccent}
            strokeWidth={1}
          />
          <Text style={styles.cardInfo}>{vacancyInfo.management_name}</Text>
        </View>
      </View>

      <VacancyInfoList
        title="Условия"
        accordionName="workingConditions"
        items={vacancyInfo.working_conditions}
        visibilityCount={3}
      />
      <VacancyInfoList
        title="Требования"
        accordionName="requirements"
        items={vacancyInfo.requirements}
        visibilityCount={1}
      />
      <VacancyInfoList
        title="Обязанности"
        accordionName="responsibilities"
        items={vacancyInfo.responsibilities}
        visibilityCount={1}
      />

      <Text style={styles.footerText}>
        По вопросам просьба обращаться в Отдел по подбору персонала{" "}
        <Text
          style={styles.footerLink}
          onPress={() => {
            Linking.openURL(`tel:+78432344234`);
          }}
        >
          8(843)2344234
        </Text>
      </Text>

      {!isVacancyResponsesLoading && vacansyResponses && (
        <GradientButton
          disabled={vacansyResponses.total > 0}
          onPress={() => {
            router.push({
              pathname: "/(withoutTabs)/vacancies/resume",
              params: { step: "1", vacancy_guid: vacancyGuidParam },
            });
          }}
          style={styles.button}
        >
          <Text>
            {vacansyResponses.total > 0
              ? "Вы уже откликнулись"
              : "Откликнуться на вакансию"}
          </Text>
        </GradientButton>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: 18,
    marginBottom: 16,
  },
  cardsContainer: {
    gap: 15,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: Colors.gray50,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 23,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  noVacancyText: {
    fontSize: 20,
    fontFamily: Fonts.TBold,
    textAlign: "center",
    width: "50%",
  },
  noVacancyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  cardInfo: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 13,
    flexShrink: 1,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.TBold,
  },
  footerText: {
    marginTop: 30,
    textAlign: "center",
  },

  footerLink: {
    color: Colors.blue,
  },
  button: {
    marginTop: 14,
  },
});

export default VacancyPage;
