import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const ChairIcon = (props: SvgProps) => {
  return (
    <Svg width={18} height={18} fill="none" stroke="#E30613" {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.625 9.563h6.75M3.375 6.75V5.062a2.25 2.25 0 0 1 2.25-2.25h6.75a2.25 2.25 0 0 1 2.25 2.25V6.75"
      />
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.625 11.813V9a2.25 2.25 0 1 0-2.25 2.25v2.813a.562.562 0 0 0 .563.562h10.124a.562.562 0 0 0 .563-.563V11.25A2.25 2.25 0 1 0 12.375 9v2.813"
      />
    </Svg>
  );
};
