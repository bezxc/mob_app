import { useQuery } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getAccuralsInfo } from "@/entities/profile";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { MiniButton, Skeleton } from "@/shared/ui";

enum IncomeType {
  MONTH = "month",
  QUARTER = "quarter",
  YEAR = "year",
}

const incomeVariants = [
  {
    id: 1,
    title: "месяц",
    income: IncomeType.MONTH,
  },
  {
    id: 2,
    title: "квартал",
    income: IncomeType.QUARTER,
  },
  {
    id: 3,
    title: "год",
    income: IncomeType.YEAR,
  },
];

function formatWithCommas(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+\b)/g, " ");
}

export const PersonalIncome: FC = () => {
  const [selectedIncome, setSelectedIncome] = useState<IncomeType>(
    IncomeType.MONTH,
  );

  const { kanUid } = useUnit($auth);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["accurals", kanUid],
    queryFn: () => getAccuralsInfo({ id: kanUid }),
  });

  return (
    <View>
      <Text style={styles.text}>Мой доход</Text>
      <View style={styles.tabsContainer}>
        {incomeVariants.map((item) => (
          <MiniButton
            key={item.id}
            textStyle={
              selectedIncome === item.income ? { color: Colors.redAccent } : {}
            }
            onPress={() => setSelectedIncome(item.income)}
          >
            {item.title}
          </MiniButton>
        ))}
      </View>
      <View style={styles.salaryCard}>
        {isLoading ? (
          <Skeleton style={styles.salarySkeleton} isLoading />
        ) : (
          <Text style={styles.salaryIncome}>
            {data
              ? `${formatWithCommas(data[selectedIncome])} ₽`
              : "Нет данных"}
          </Text>
        )}
        <Text style={styles.salaryTitle}>Зарплата</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  salarySkeleton: {
    height: 25,
    borderRadius: 10,
  },
  salaryIncome: {
    fontSize: 16,
    fontFamily: Fonts.TBold,
  },
  salaryTitle: {
    fontSize: 14,
    fontFamily: Fonts.TRegular,
  },
  salaryCard: {
    backgroundColor: Colors.grayLight,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  text: {
    fontFamily: Fonts.TBold,
    fontSize: 22,
  },
  dot: {
    fontSize: 22,
  },
  tabsContainer: {
    marginVertical: 10,
    flexDirection: "row",
    gap: 5,
  },
});
