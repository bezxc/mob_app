import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const VacancyIcon = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 20 35 5M30.607 9.394a14.985 14.985 0 1 0 2.932 4.139"
    />
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M25.303 14.697a7.5 7.5 0 1 0 2.185 4.875"
    />
  </Svg>
);
