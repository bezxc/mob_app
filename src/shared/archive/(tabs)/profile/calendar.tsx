import "dayjs/locale/ru";
import dayjs from "dayjs";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { CalendarComponent } from "@/widgets/Calendar";
import { CalendarEvents } from "@/widgets/CalendarEvents";

const Calendar = () => {
  const events = [
    {
      date: "2024-06-12",
      time: "с 17:00 до 17:30",
      title: "Командировка в Московский офис",
      id: "1",
    },
    {
      date: "2024-06-12",
      time: "с 17:00 до 17:30",
      title: "Командировка в Московский офис",
      id: "2",
    },

    {
      date: "2024-06-12",
      time: "с 18:00 до 19:00",
      title: "Обновить документы для продажников",
      id: "3",
    },
    {
      date: "2024-06-19",
      time: "с 10:00 до 10:30",
      title: "Встреча с клиентами",
      id: "4",
    },
    {
      date: "2024-06-23",
      time: "с 14:00 до 15:00",
      title: "Презентация проекта",
      id: "5",
    },
    {
      date: "2024-06-12",
      time: "с 17:00 до 17:30",
      title: "Командировка в Московский офис",
      id: "6",
    },
    {
      date: "2024-06-12",
      time: "с 17:00 до 17:30",
      title: "Командировка в Московский офис",
      id: "7",
    },
  ];

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD"),
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CalendarComponent
        events={events}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <CalendarEvents events={events} selectedDate={selectedDate} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Calendar;
