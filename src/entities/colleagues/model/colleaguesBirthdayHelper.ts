import dayjs from "dayjs";
import { formatDateWithTime } from "@/shared/utils";
import { IColleaguesItemV2 } from "./types";

export function groupByDateOfBirth(data?: IColleaguesItemV2[] | []) {
  if (!data || data.length === 0) return [];
  const result: (IColleaguesItemV2 | string)[] = [];
  const uniqueDates = new Set();

  data.forEach((item) => {
    const formattedDate = formatDateWithTime(
      item.date_of_birth,
      "dayWithMonth"
    );

    if (!uniqueDates.has(formattedDate)) {
      result.push(formattedDate);
      uniqueDates.add(formattedDate);
    }

    result.push(item);
  });

  return result;
}

export const getInitialIndex = (colleagues: (IColleaguesItemV2 | string)[]) => {
  if (colleagues.length > 0) {
    const findIndex = colleagues.findIndex((item) => {
      const formattedDate = formatDateWithTime(
        dayjs().toISOString(),
        "dayWithMonth"
      );
      if (typeof item === "string") {
        return formattedDate === item;
      }
      return false;
    });
    return findIndex === -1 ? 0 : findIndex;
  }
  return null;
};
