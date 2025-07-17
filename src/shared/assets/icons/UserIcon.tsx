import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const UserIcon = (props: SvgProps) => (
  <Svg width={32} height={32} stroke="#fff" fill="none" {...props}>
    <Path strokeMiterlimit={10} d="M16 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.874 26.999a14.005 14.005 0 0 1 24.252 0"
    />
  </Svg>
);
