import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const TabsPostsIcon = (props: SvgProps) => (
  <Svg fill="none" width={32} height={32} stroke="#999" {...props}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 14h10M13 18h10M5 25a2 2 0 0 0 2-2V8a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v15a2 2 0 0 1-2 2H5ZM5 25a2 2 0 0 1-2-2V11"
    />
  </Svg>
);
