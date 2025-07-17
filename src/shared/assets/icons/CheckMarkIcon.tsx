import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const CheckMarkIcon = (props: SvgProps) => (
  <Svg width={10} height={8} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.781 1.938 3.74 6.75 1.219 4.344"
    />
  </Svg>
);
