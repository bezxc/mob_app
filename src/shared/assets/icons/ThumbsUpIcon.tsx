import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const ThumbsUpIcon = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    stroke="#ffffff"
    fill="none"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.75 8.938h4.125v8.937H2.75a.687.687 0 0 1-.688-.688V9.625a.687.687 0 0 1 .688-.688v0ZM6.875 8.938l3.437-6.876a2.75 2.75 0 0 1 2.75 2.75v2.063h5.317a1.375 1.375 0 0 1 1.365 1.546l-1.031 8.25a1.375 1.375 0 0 1-1.365 1.204H6.875"
    />
  </Svg>
);
