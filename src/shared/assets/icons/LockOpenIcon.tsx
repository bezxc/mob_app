import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const LockOpenIcon = (props: SvgProps) => (
  <Svg width={32} height={32} stroke="#fff" fill="none" {...props}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M26 11H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V12a1 1 0 0 0-1-1ZM11.5 11V6.5a4.5 4.5 0 1 1 9 0"
    />
    <Path d="M16 20.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
  </Svg>
);
