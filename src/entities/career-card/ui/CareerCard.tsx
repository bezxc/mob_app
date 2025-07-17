import dayjs from "dayjs";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { HistoriesType } from "@/entities/profile";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface ICareerCardProps extends ViewProps {
  historyItem: HistoriesType;
}
export const CareerCard: FC<ICareerCardProps> = ({
  historyItem,
  style,
  ...props
}) => (
  <View style={[styles.card, style]} {...props}>
    <View style={styles.info}>
      <Text style={styles.title}>Период работы</Text>
      <Text style={styles.description}>
        {`${dayjs(historyItem.date_start).format("DD.MM.YYYY")} - ${historyItem.date_end ? dayjs(historyItem.date_end).format("DD.MM.YYYY") : "По настоящее время"}`}
      </Text>
    </View>
    <View style={styles.info}>
      <Text style={styles.title}>Должность</Text>
      <Text style={styles.description}>{historyItem.position_name}</Text>
    </View>
    {historyItem.division && (
      <>
        <View style={styles.info}>
          <Text style={styles.title}>Отдел</Text>
          <Text style={styles.description}>{historyItem.division.name}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>Управленческое подразделение</Text>
          <Text style={styles.description}>
            {historyItem.division.management.name}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>Коробка</Text>
          <Text style={styles.description}>
            {historyItem.division.management.department.name}
          </Text>
        </View>
      </>
    )}
    <View style={styles.info}>
      <Text style={styles.title}>Юридическое лицо</Text>
      <Text style={styles.description}>{historyItem.organization_name}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.grayLight,
    borderRadius: 20,
    gap: 12,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.grayLight,
    zIndex: 10,
    paddingBottom: 8,
  },
  subCard: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    margin: -5,
    zIndex: -1,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  title: {
    color: Colors.gray70,
    fontFamily: Fonts.TRegular,
    fontSize: 12,
  },
  description: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 13,
    flexShrink: 1,
  },
  descriptionSubCard: {
    fontFamily: Fonts.TBold,
    fontSize: 13,
  },
  info: {
    paddingLeft: 15,
    gap: 3,
  },
});
