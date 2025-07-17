import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const BookmarkIcon = (props: SvgProps) => (
  <Svg width={28} height={28} fill="none" {...props}>
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 24.5-7.002-4.375L7 24.5V5.25a.875.875 0 0 1 .875-.875h12.25A.875.875 0 0 1 21 5.25V24.5Z"
    />
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 19.25-7.002-4.375L7 19.25"
    />
  </Svg>
);
