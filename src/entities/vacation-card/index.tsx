import { FC } from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface IVacationCardProps {
  amountText: string | number;
  description: string;
  textAmountStyles?: TextStyle;
}

export const VacationCard: FC<IVacationCardProps> = ({
  amountText,
  description,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.textAmount}>{amountText}</Text>
        <Text style={styles.textType}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    backgroundColor: Colors.grayLight,
  },
  textContainer: {
    gap: 5,
    justifyContent: "space-between",
  },
  textAmount: {
    fontFamily: Fonts.TBold,
    fontSize: 16,
  },
  textType: {
    color: Colors.gray70,
    fontSize: 12,
  },
});
