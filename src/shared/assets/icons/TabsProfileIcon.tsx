import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const TabsProfileIcon = (props: SvgProps) => (
  <Svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    stroke="#999999"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M26.25 16.25h-12.5a5 5 0 0 0-5 5v1.25a5 5 0 0 0 5 5h12.5a5 5 0 0 0 5-5v-1.25a5 5 0 0 0-5-5Z"
    />
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 10a3.75 3.75 0 0 1 7.5 0h17.5a3.75 3.75 0 0 1 7.5 0v12.5a10 10 0 0 1-10 10h-12.5a10 10 0 0 1-10-10V10Z"
    />
    <Path
      fill={props.stroke || "#999999"}
      d="M14.375 23.125a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM25.625 23.125a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
    />
  </Svg>
);
