import { LocaleConfig } from "react-native-calendars";

export const setCurrentLocale = () => {
  LocaleConfig.locales["ru"] = {
    monthNames: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    monthNamesShort: [
      "Янв.",
      "Февр.",
      "Март",
      "Апр.",
      "Май",
      "Июнь",
      "Июль",
      "Авг.",
      "Сент.",
      "Окт.",
      "Нояб.",
      "Дек.",
    ],
    dayNames: [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ],
    dayNamesShort: ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
    today: "Сегодня",
  };
  LocaleConfig.defaultLocale = "ru";
};
