import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const NoteIcon = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    stroke="#fff"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 8.25h5.5M8.25 11h5.5M8.25 13.75H11M13.465 18.563h-9.34a.687.687 0 0 1-.688-.688V4.125a.688.688 0 0 1 .688-.688h13.75a.687.687 0 0 1 .688.688v9.34a.688.688 0 0 1-.202.486l-4.41 4.41a.689.689 0 0 1-.486.201v0Z"
    />
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.5 13.75h-4.75v4.75"
    />
  </Svg>
);
