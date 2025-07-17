import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const BookBookmarkIcon = (props: SvgProps) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.125 2.75V11l-2.75-2.063L9.625 11V2.75"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.125 18.563A2.062 2.062 0 0 1 6.188 16.5h11.687V2.75H6.188a2.063 2.063 0 0 0-2.063 2.063v13.75Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.125 18.563v.687H16.5"
    />
  </Svg>
);
