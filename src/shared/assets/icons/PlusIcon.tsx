import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const PlusIcon = (props: SvgProps) => (
  <Svg width={26} height={26} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.063 13h17.875M13 4.063v17.875"
    />
  </Svg>
);
