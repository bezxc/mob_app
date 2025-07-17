import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const StackIcon = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m5 27.5 15 8.75 15-8.75"
    />
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m5 20 15 8.75L35 20"
    />
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m5 12.5 15 8.75 15-8.75-15-8.75L5 12.5Z"
    />
  </Svg>
);
