import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const Barbell = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.75 8.75H10c-.69 0-1.25.56-1.25 1.25v20c0 .69.56 1.25 1.25 1.25h3.75c.69 0 1.25-.56 1.25-1.25V10c0-.69-.56-1.25-1.25-1.25ZM30 8.75h-3.75c-.69 0-1.25.56-1.25 1.25v20c0 .69.56 1.25 1.25 1.25H30c.69 0 1.25-.56 1.25-1.25V10c0-.69-.56-1.25-1.25-1.25ZM31.25 12.5H35a1.25 1.25 0 0 1 1.25 1.25v12.5A1.25 1.25 0 0 1 35 27.5h-3.75M8.75 27.5H5a1.25 1.25 0 0 1-1.25-1.25v-12.5A1.25 1.25 0 0 1 5 12.5h3.75M15 20h10M36.25 20h2.5M1.25 20h2.5"
    />
  </Svg>
);
