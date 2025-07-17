import dayjs from "dayjs";
import { router } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { months } from "../model/months";

interface Event {
  date: string;
  time: string;
  title: string;
  id: string;
}
interface ICalendarEventItem {
  event: Event;
  index: number;
}

export const CalendarEventItem: FC<ICalendarEventItem> = ({ event, index }) => {
  const month = dayjs(event.date).month();
  const date = dayjs(event.date).date();
  const fullDate = `${date} ${months[month]}`;

  const bgIndex = index % 3;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        styles.eventItem,
        bgIndex === 0 && styles.eventItemBgBlue,
        bgIndex === 1 && styles.eventItemBgPink,
        bgIndex === 2 && styles.eventItemBgGreen,
      ]}
      onPress={() => router.push(`/(withoutTabs)/eventInfo/${event.id}`)}
    >
      <View style={styles.eventDateTimeWrapper}>
        <View style={styles.eventDateTime}>
          <Text style={styles.eventDateTimeText}>{fullDate}</Text>
        </View>
        <View style={styles.eventDateTime}>
          <Text style={styles.eventDateTimeText}>{event.time}</Text>
        </View>
      </View>
      <Text style={styles.eventTitle}>{event.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
    gap: 9,
  },
  eventItemBgBlue: {
    backgroundColor: Colors.blueLight,
  },
  eventItemBgPink: {
    backgroundColor: Colors.pink,
  },
  eventItemBgGreen: {
    backgroundColor: Colors.greenLight,
  },
  eventDateTimeWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 6,
  },
  eventDateTime: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  eventDateTimeText: {
    fontFamily: Fonts.TBold,
    fontSize: 10,
    color: Colors.black,
  },
  eventTitle: {
    fontSize: 14,
    fontFamily: Fonts.TBold,
  },
});
