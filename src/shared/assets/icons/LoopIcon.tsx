import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const LoopIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    stroke="#000"
    viewBox="0 0 20 20"
    width={20}
    height={20}
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.063 15.625a6.562 6.562 0 1 0 0-13.125 6.562 6.562 0 0 0 0 13.125ZM13.703 13.703 17.5 17.5"
    />
  </Svg>
);
