import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const CalendarIcon = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M26 5H6a1 1 0 0 0-1 1v20a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1ZM22 3v4M10 3v4M5 11h22"
    />
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.5 16H15l-2 2.5a2 2 0 1 1-1.413 3.415M18 17.5l2-1.5v6.5"
    />
  </Svg>
);
