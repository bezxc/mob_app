import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const BriefCaseIcon = (props: SvgProps) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
    <Path
      stroke={props.stroke || "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.563 5.5H3.438a.688.688 0 0 0-.687.688v11c0 .38.308.687.687.687h15.125c.38 0 .688-.308.688-.688v-11a.687.687 0 0 0-.688-.687Z"
    />
    <Path
      stroke={props.stroke || "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.438 5.5V4.125a1.375 1.375 0 0 0-1.376-1.375H8.939a1.375 1.375 0 0 0-1.376 1.375V5.5M19.25 10.167A16.423 16.423 0 0 1 11 12.375a16.423 16.423 0 0 1-8.25-2.207M9.969 9.625h2.062"
    />
  </Svg>
);
