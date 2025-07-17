import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const BookIcon = (props: SvgProps) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 7.563a2.75 2.75 0 0 1 2.75-2.75h5.5a.687.687 0 0 1 .688.687v11a.687.687 0 0 1-.688.688h-5.5a2.75 2.75 0 0 0-2.75 2.75M2.063 16.5a.687.687 0 0 0 .687.688h5.5a2.75 2.75 0 0 1 2.75 2.75V7.563a2.75 2.75 0 0 0-2.75-2.75h-5.5a.688.688 0 0 0-.688.687v11Z"
    />
  </Svg>
);
