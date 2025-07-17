import dayjs from "dayjs";
import {
  formatDateWithTime,
  getEndingOfAWordByMounth,
  getEndingOfAWordByYear,
} from "@/shared/utils";

export const getMonthDifference = (dateStr: string) => {
  return dayjs().diff(dayjs(dateStr), "month");
};

const getDescriptionText = (data: {
  max: number;
  min: number;
  trPos: string | boolean;
}) => {
  const { max, min, trPos } = data;

  const remainingMonths = max - min;

  const years = Math.floor(remainingMonths / 12);
  const months = remainingMonths % 12;

  const timeString = [
    years > 0 ? getEndingOfAWordByYear(years) : null,
    months > 0 ? getEndingOfAWordByMounth(months) : null,
  ]
    .filter(Boolean)
    .join(" ");

  let descriptionText = `Переход на след. категорию возможен через ${timeString} работы на текущей должности`;

  if (trPos) {
    switch (trPos) {
      case "рук":
        descriptionText += " или при переходе на руководящую позицию";
        break;
      case "дир":
        descriptionText += " или при переходе на позицию директора";
        break;
      default:
        return false;
    }
  }
  return descriptionText;
};

export const getCategoryCalculation = (userInfo: {
  expDate?: string;
  positionGroup?: string;
  discountCategory?: number;
}) => {
  const { expDate, positionGroup, discountCategory } = userInfo;

  if (!expDate || !positionGroup || !discountCategory) {
    return false;
  }

  const expMonths = getMonthDifference(expDate);

  const transformedPositionGroup = positionGroup.toLowerCase().trim();

  switch (discountCategory) {
    case 1:
      return `${getDescriptionText({ max: 12, min: expMonths, trPos: "рук" })}`;
    case 2:
      if (transformedPositionGroup === "сотрудник") {
        if (expMonths < 36) {
          return `${getDescriptionText({ max: 60, min: expMonths, trPos: "дир" })}`;
        }
        return `${getDescriptionText({ max: 60, min: expMonths, trPos: "рук" })}`;
      }
      return `${getDescriptionText({ max: 36, min: expMonths, trPos: "дир" })}`;
    case 3:
      if (transformedPositionGroup === "сотрудник") {
        if (expMonths < 84) {
          return `${getDescriptionText({ max: 120, min: expMonths, trPos: false })}`;
        }
        return `${getDescriptionText({ max: 120, min: expMonths, trPos: "рук" })}`;
      }
      return `${getDescriptionText({ max: 84, min: expMonths, trPos: false })}`;

    default:
      return false;
  }
};

export const getDateRange = ({
  startDate,
  endDate,
}: {
  startDate: string | null;
  endDate: string | null;
}) => {
  if (startDate && endDate) {
    return `с ${formatDateWithTime(startDate, "fullDateWithDots")} до ${formatDateWithTime(endDate, "fullDateWithDots")}`;
  }

  if (startDate) {
    return `С ${formatDateWithTime(startDate, "fullDateWithDots")}`;
  }

  if (endDate) {
    return `До ${formatDateWithTime(endDate, "fullDateWithDots")}`;
  }

  return "Период действия: не указан";
};

export const getDocumentName = (doc: { file_key: string }) => {
  const documentName =
    decodeURI(doc.file_key)
      .split("/")
      .pop()
      ?.split("?")[0]
      .split("%40")
      .pop() || "";

  return documentName;
};
