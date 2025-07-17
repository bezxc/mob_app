import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const MarkerIcon = (props: SvgProps) => (
  <Svg width={28} height={28} fill="none" {...props}>
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 14.875a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
    />
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22.75 11.375c0 7.875-8.75 14-8.75 14s-8.75-6.125-8.75-14a8.75 8.75 0 1 1 17.5 0v0Z"
    />
  </Svg>
);
