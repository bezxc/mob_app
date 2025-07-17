import { Theme } from "react-native-calendars/src/types";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const theme: Theme = {
  selectedDayBackgroundColor: Colors.redAccent,
  todayTextColor: Colors.white,
  todayBackgroundColor: Colors.black,
  textDayHeaderFontFamily: Fonts.TRegular,
  textDayHeaderFontSize: 12,
  dotColor: Colors.redAccent,
  arrowColor: Colors.redAccent,
  textMonthFontSize: 18,
  textMonthFontFamily: Fonts.TBold,
  textMonthFontWeight: "700",
  arrowStyle: {
    backgroundColor: Colors.redAccent,
    width: 26,
    height: 26,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
};
