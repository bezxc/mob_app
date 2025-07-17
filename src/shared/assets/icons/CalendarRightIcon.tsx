import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const CalendarRightIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m6 3 5 5-5 5"
    />
  </Svg>
);
