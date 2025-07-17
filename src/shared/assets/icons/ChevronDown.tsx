import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const ChevronDown = (props: SvgProps) => (
  <Svg width={13} height={7} fill="none" {...props}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m11.5 1-5 5-5-5"
    />
  </Svg>
);
