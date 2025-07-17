import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const Heartbeat = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 20h6.25l2.5-3.75 5 7.5 2.5-3.75H25"
    />
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.393 14.999a11.028 11.028 0 0 1-.018-.624A8.126 8.126 0 0 1 20 11.245h0a8.126 8.126 0 0 1 15.625 3.13C35.625 25 20 33.75 20 33.75S13.759 30.255 9.165 25"
    />
  </Svg>
);
