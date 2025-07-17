import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const FiltersIcon = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 13.5V27M16 5v3.5M16 13.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM25 23.5V27M25 5v13.5M25 23.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM7 19.5V27M7 5v9.5M7 19.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
    />
  </Svg>
);
