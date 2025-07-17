import dayjs from "dayjs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DateData } from "react-native-calendars";
import { Colors, Fonts } from "@/shared/styles/tokens";

export interface Events {
  date: string;
  time: string;
  title: string;
  id: string;
}
[];

interface IRenderDay {
  date?: DateData;
  state?: string;
  selectedDate: string;
  setSelectedDate: (arg: string) => void;
  events: Events[];
}
export const renderDay = ({
  date,
  state,
  setSelectedDate,
  selectedDate,
  events,
}: IRenderDay) => {
  const eventsCountByDate = events.reduce(
    (acc: Record<string, number>, event) => {
      if (!acc[event.date]) {
        acc[event.date] = 0;
      }
      acc[event.date] += 1;
      return acc;
    },
    {},
  );

  const dateStr: string = dayjs(date?.dateString).format("YYYY-MM-DD");
  const eventCount: number = eventsCountByDate[dateStr] || 0;
  const isSelected: boolean = selectedDate === dateStr;
  const isToday: boolean = dayjs().isSame(dateStr, "day");

  const handlePress = () => {
    setSelectedDate(dateStr);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.dayContainer}>
      <View
        style={[
          styles.dayWrapper,
          eventCount > 0 && styles.eventWrapper,
          isToday && styles.todayWrapper,
          isSelected && styles.selectedDayWrapper,
        ]}
      >
        <Text
          style={[
            styles.dayText,
            state === "disabled" && styles.disabledDayText,
            isToday && styles.todayText,
          ]}
        >
          {date?.day}
        </Text>
        {eventCount > 0 && (
          <View style={styles.eventCountContainer}>
            <Text style={styles.eventCountText}>{eventCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 37,
    height: 37,
    margin: 1,
  },
  dayWrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    width: 37,
    height: 37,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedDayWrapper: {
    borderColor: Colors.grayStroke,
  },
  todayWrapper: {
    backgroundColor: Colors.black,
  },
  eventWrapper: {
    backgroundColor: Colors.grayLight,
  },
  dayText: {
    fontSize: 14,
    fontFamily: Fonts.TBold,
  },
  disabledDayText: {
    color: Colors.grayText,
  },
  todayText: {
    color: Colors.white,
  },
  eventCountContainer: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: Colors.redAccent,
    borderRadius: 8,
    padding: 2,
    paddingBottom: 3,
    minWidth: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  eventCountText: {
    color: Colors.white,
    fontFamily: Fonts.TBold,
    fontSize: 10,
  },
});
