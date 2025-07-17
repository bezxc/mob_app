import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const MediaIcon = (props: SvgProps) => (
  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m13.357 4.197-8.501 9.21a.875.875 0 0 0 .643 1.468h17.003a.876.876 0 0 0 .643-1.469l-8.502-9.21a.875.875 0 0 0-1.286 0v0ZM4.375 19.25v2.625c0 .483.392.875.875.875h17.5a.875.875 0 0 0 .875-.875V19.25a.875.875 0 0 0-.875-.875H5.25a.875.875 0 0 0-.875.875Z"
    />
  </Svg>
);
