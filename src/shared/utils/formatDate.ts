import ru from "dayjs/locale/ru";
import dayjs from "../lib/dayjs";

dayjs.locale(ru);

type IVariant =
  | "newsCard"
  | "commentCard"
  | "dayWithMonth"
  | "dayWithMonthAndYear"
  | "fullDate"
  | "dayWithMonthAndYearAndHourMinute"
  | "fullDateWithDots"
  | "issuesCard";

export function formatDateWithTime(
  date: string | undefined,
  variant: IVariant = "newsCard"
) {
  switch (variant) {
    // TODO: 1 Переименовать в зависимости от типа возвращаемой даты, а не от места использования
    case "newsCard":
      return dayjs(date).format("D MMMM YYYY * HH:mm");
    // TODO: 2 Переименовать в зависимости от типа возвращаемой даты, а не от места использования
    case "commentCard":
      return dayjs(date).format("D MMMM, HH:mm");
    case "dayWithMonth":
      return dayjs(date).format("D MMMM");
    case "fullDate":
      return dayjs(date).format("YYYY-MM-DD");
    case "dayWithMonthAndYear":
      return dayjs(date).format("D MMMM YYYY");
    case "dayWithMonthAndYearAndHourMinute":
      return dayjs(date).format("D MMMM YYYY HH:mm");
    // TODO: 3 Переименовать в зависимости от типа возвращаемой даты, а не от места использования
    case "issuesCard":
      return dayjs(date).format("D.MM.YYYY");
    case "fullDateWithDots":
      return dayjs(date).format("DD.MM.YYYY");
    default:
      return dayjs(date).format("D MMMM YYYY");
  }
}
