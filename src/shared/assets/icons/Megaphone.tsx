import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const Megaphone = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.999 7.917v21.666a1.25 1.25 0 0 0 1.6 1.2l27.5-8.02a1.25 1.25 0 0 0 .9-1.2v-5.626a1.25 1.25 0 0 0-.9-1.2l-27.5-8.02a1.25 1.25 0 0 0-1.6 1.2v0Z"
    />
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M28.75 24.323V30a1.25 1.25 0 0 1-1.25 1.25h-5A1.25 1.25 0 0 1 21.25 30V10.99"
    />
  </Svg>
);
