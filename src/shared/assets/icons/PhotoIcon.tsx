import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const PhotoIcon = (props: SvgProps) => (
  <Svg width={32} height={29} fill="none" viewBox="0 0 32 29" {...props}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M28.5 27.5h-25A2.5 2.5 0 0 1 1 25V7.5A2.5 2.5 0 0 1 3.5 5h5L11 1.25h10L23.5 5h5A2.5 2.5 0 0 1 31 7.5V25a2.5 2.5 0 0 1-2.5 2.5Z"
    />
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 21.25A5.625 5.625 0 1 0 16 10a5.625 5.625 0 0 0 0 11.25Z"
    />
  </Svg>
);
