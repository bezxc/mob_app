import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const ChevronLeft = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    stroke="#000"
    viewBox="0 0 32 32"
    strokeWidth={2}
    {...props}
  >
    <Path strokeLinecap="round" strokeLinejoin="round" d="M20 26 10 16 20 6" />
  </Svg>
);
