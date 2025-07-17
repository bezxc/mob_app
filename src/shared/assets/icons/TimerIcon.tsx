import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export function TimerIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 18 18" fill="none" stroke="#E30613" {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5.625V9M11.923 10.688 9 9M12.95 7.011h2.812V4.2"
      />
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.375 13.375a6.186 6.186 0 1 1 0-8.75l2.387 2.386"
      />
    </Svg>
  );
}
