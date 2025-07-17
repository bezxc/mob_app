import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const CallCenterIcon = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.063 8.25h17.875L11 2.75l-8.937 5.5ZM4.813 8.25v6.875M8.938 8.25v6.875M13.063 8.25v6.875M17.188 8.25v6.875M2.75 15.125h16.5M1.375 17.875h19.25"
    />
  </Svg>
);
