import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const DownloadIcon = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.047 7.735 9 10.687l2.953-2.952M9 2.813v7.872M15.188 10.688v3.937a.562.562 0 0 1-.563.563H3.375a.563.563 0 0 1-.563-.563v-3.938"
    />
  </Svg>
);
