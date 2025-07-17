import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Events } from "@/features/Calendar/ui/CalendarDay";
import { CalendarEventItem } from "@/features/CalendarEventItem";
import { Fonts } from "@/shared/styles/tokens";

interface ICalendarEventsProps {
  events: Events[];
  selectedDate: string;
}
export const CalendarEvents: FC<ICalendarEventsProps> = ({
  events,
  selectedDate,
}) => {
  const filteredEvents = events.filter((event) => event.date === selectedDate);

  return (
    <View style={styles.eventList}>
      <Text style={styles.title}>События</Text>
      {filteredEvents.length > 0 ? (
        filteredEvents.map((item, index) => (
          <CalendarEventItem key={item.id} event={item} index={index} />
        ))
      ) : (
        <Text>Нет событий</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  eventList: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.TBold,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.TRegular,
  },
});
