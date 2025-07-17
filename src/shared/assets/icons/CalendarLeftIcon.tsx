import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const CalendarLeftIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 3 5 8l5 5"
    />
  </Svg>
);
