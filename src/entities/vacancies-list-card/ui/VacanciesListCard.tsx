import { router } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getVacancySalary, TVacancyItem } from "@/entities/vacancies";
import { BriefCaseIcon } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface IVacanciesListCardProps {
  item: TVacancyItem;
}

function formatWithCommas(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+\b)/g, " ");
}

export const VacanciesListCard: FC<IVacanciesListCardProps> = ({ item }) => {
  const vacancySalary = getVacancySalary({
    from: formatWithCommas(item.avg_wage_from),
    to: formatWithCommas(item.avg_wage_to),
  });

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        router.push({
          pathname: `/(withoutTabs)/vacancies/[vacancy]`,
          params: { vacancy: item.guid, title: item.position_name },
        });
      }}
    >
      <View style={styles.iconContainer}>
        <BriefCaseIcon width={32} height={32} stroke={Colors.redAccent} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.position_name}</Text>
        <Text style={[styles.subtitle, styles.semiBoldSubtitle]}>
          {vacancySalary}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.subtitle, styles.regularSubtitle]}
        >
          {item.department_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    height: 65,
  },
  iconContainer: {
    width: 65,
    height: 65,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.gray50,
  },
  infoContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-evenly",
    paddingLeft: 14,
    gap: 9,
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.gray70,
  },
  semiBoldSubtitle: {
    fontFamily: Fonts.SFSemiBold,
  },
  regularSubtitle: {
    fontFamily: Fonts.TRegular,
  },
});
