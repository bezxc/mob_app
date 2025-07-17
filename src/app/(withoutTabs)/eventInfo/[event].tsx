import { StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";

const Event = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Событие</Text>
        <Text style={styles.description}>
          Создано 24 марта · Организатор Каримова Гульшат
        </Text>
        <View style={styles.eventDateTimeWrapper}>
          <View style={[styles.eventInner, styles.eventDate]}>
            <Text style={[styles.eventText, styles.eventDateText]}>
              12 августа
            </Text>
          </View>
          <View style={[styles.eventInner, styles.eventTime]}>
            <Text style={[styles.eventText, styles.eventTimeText]}>
              с 18:00 до 19:00
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.paragraph}>
        <Text style={styles.paragraphTitle}>Описание</Text>
        <Text style={styles.paragraphDesc}>Нет описания</Text>
      </View>
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    gap: 34,
  },
  header: {
    gap: 8,
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 18,
  },
  description: {
    fontFamily: Fonts.TRegular,
    color: Colors.grayText,
    fontSize: 12,
  },
  eventDateTimeWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 6,
  },
  eventInner: {
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  eventDate: {
    backgroundColor: Colors.pink,
  },
  eventTime: {
    backgroundColor: Colors.black,
  },
  eventText: {
    fontFamily: Fonts.TBold,
    fontSize: 10,
  },
  eventDateText: {
    color: Colors.black,
  },
  eventTimeText: {
    color: Colors.white,
  },
  paragraph: {
    gap: 8,
  },
  paragraphTitle: {
    fontFamily: Fonts.TBold,
    fontSize: 12,
    color: Colors.redAccent,
  },
  paragraphDesc: {
    fontFamily: Fonts.TRegular,
    fontSize: 14,
  },
});
