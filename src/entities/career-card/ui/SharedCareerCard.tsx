import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { VacationCard } from "@/entities/vacation-card";
import { getYearAndMountExperience } from "../model/helper";

interface ISharedCareerCardProps extends ViewProps {
  discount_category: number;
  date_of_experience: string;
}

export const SharedCareerCard: FC<ISharedCareerCardProps> = ({
  date_of_experience,
  discount_category,
}) => {
  const { mounthExpirience, yearsExpirience } = getYearAndMountExperience({
    date_start: date_of_experience,
  });
  return (
    <View style={styles.container}>
      <VacationCard
        description="Общий стаж в ГК КАН АВТО"
        amountText={
          yearsExpirience
            ? `${yearsExpirience} 
${mounthExpirience}`
            : mounthExpirience
        }
      />
      <VacationCard
        textAmountStyles={{ fontSize: 16 }}
        description="Категория скидок"
        amountText={discount_category}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 12,
  },
});
