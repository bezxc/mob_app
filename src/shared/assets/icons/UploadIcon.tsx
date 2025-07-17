import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const UploadIcon = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.75 10.249 16 5l5.25 5.249M16 19V5.004M27 19v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7"
    />
  </Svg>
);
