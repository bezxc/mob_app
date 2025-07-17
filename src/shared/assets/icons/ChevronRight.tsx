import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const ChevronRight = (props: SvgProps) => (
  <Svg width={12} height={12} fill="none" {...props}>
    <Path
      stroke="#999"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m1 11 5-5-5-5"
    />
  </Svg>
);
