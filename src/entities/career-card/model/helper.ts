import dayjs from "dayjs";
import {
  getEndingOfAWordByMounth,
  getEndingOfAWordByYear,
} from "@/shared/utils";

interface IGetYearAndMountExperienceArgs {
  date_start?: string | null;
  date_end?: string | null;
}

interface IGetYearAndMountExperienceReturn {
  yearsExpirience: string;
  mounthExpirience: string;
}

type IGetYearAndMountExperienceFn = (
  args: IGetYearAndMountExperienceArgs
) => IGetYearAndMountExperienceReturn;

export const getYearAndMountExperience: IGetYearAndMountExperienceFn = ({
  date_start,
  date_end,
}) => {
  const yearDiff = dayjs(date_end || new Date()).diff(
    dayjs(date_start || new Date()),
    "year"
  );
  const mounthDiff =
    dayjs(date_end || new Date()).diff(dayjs(date_start || new Date()), "M") %
    12;
  const yearsExpirience = yearDiff > 0 ? getEndingOfAWordByYear(yearDiff) : "";
  const mounthExpirience =
    mounthDiff > 0 ? getEndingOfAWordByMounth(mounthDiff) : "";
  return {
    yearsExpirience,
    mounthExpirience,
  };
};
