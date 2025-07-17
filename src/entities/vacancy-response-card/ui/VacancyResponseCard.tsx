import dayjs from "dayjs";
import { router } from "expo-router";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TVacancyResponseItem } from "@/entities/vacancies";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface IVacancyResponseCardProps {
  item: TVacancyResponseItem;
}

export const VacancyResponseCard: FC<IVacancyResponseCardProps> = ({
  item,
}) => {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/(withoutTabs)/vacancies/[vacancy]`,
          params: {
            vacancy: item.vacancy_guid,
            title: item.vacancy.position_name,
          },
        })
      }
      style={styles.cardContainer}
    >
      <View>
        <Text style={styles.title}>Вакансия</Text>
        <Text style={styles.description}>{item.vacancy.position_name}</Text>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.inner}>
          <Text>Дата отклика</Text>
          <Text style={styles.innerDescription}>
            {dayjs(item.created_at).format("DD.MM.YYYY")}
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Text>Подразделение</Text>
          <Text style={styles.innerDescription}>
            {item.vacancy.management_name}
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <Text>Коробка</Text>
          <Text style={styles.innerDescription}>
            {item.vacancy.department_name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: Colors.gray50,
    borderRadius: 20,
    paddingTop: 15,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    gap: 12,
  },
  title: { textAlign: "center", fontSize: 13 },
  description: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: Fonts.TBold,
  },
  wrapper: {
    backgroundColor: Colors.grayIndicator,
    width: "100%",
  },
  inner: { paddingHorizontal: 20, paddingVertical: 10 },
  innerDescription: { fontFamily: Fonts.SFSemiBold },
});
