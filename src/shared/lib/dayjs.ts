import dayjs from "dayjs";
import parseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(parseFormat);

dayjs.extend((_, dayjsClass) => {
  const oldFormat = dayjsClass.prototype.format;
  dayjsClass.prototype.format = function (formatString) {
    return oldFormat.bind(this)(formatString ?? "YYYY-MM-DD");
  };
});

export default dayjs;
