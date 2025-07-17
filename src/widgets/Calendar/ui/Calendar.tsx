import "dayjs/locale/ru";
import { FC } from "react";
import { Calendar } from "react-native-calendars";
import { Events, renderDay, setCurrentLocale } from "@/features/Calendar";
import { CalendarLeftIcon, CalendarRightIcon } from "@/shared/assets/icons";
import { Colors } from "@/shared/styles/tokens";
import { theme } from "./theme";

// Устанавливем русскую локализацию
setCurrentLocale();

interface ICalendarComponentProps {
  events: Events[];
  selectedDate: string;
  setSelectedDate: (arg: string) => void;
}

export const CalendarComponent: FC<ICalendarComponentProps> = ({
  events,
  selectedDate,
  setSelectedDate,
}) => {
  const markedDates = events.reduce(
    (acc: Record<string, { marked: boolean; dotColor: string }>, event) => {
      acc[event.date] = { marked: true, dotColor: Colors.redAccent };
      return acc;
    },
    {},
  );
  return (
    <>
      <Calendar
        key={selectedDate}
        firstDay={1}
        current={selectedDate}
        onDayPress={(day) => {
          if (day.dateString !== selectedDate) {
            setSelectedDate(day.dateString);
          }
        }}
        renderArrow={(direction) =>
          direction === "left" ? <CalendarLeftIcon /> : <CalendarRightIcon />
        }
        dayComponent={({ date, state }) =>
          renderDay({ date, state, events, selectedDate, setSelectedDate })
        }
        markedDates={{
          ...markedDates,
          [selectedDate]: { selected: true, selectedColor: Colors.redAccent },
        }}
        theme={theme}
      />
    </>
  );
};
