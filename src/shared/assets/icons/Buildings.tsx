import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const Buildings = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.5 33.747h35M22.499 33.747v-27.5a1.25 1.25 0 0 0-1.25-1.25h-15a1.25 1.25 0 0 0-1.25 1.25v27.5M34.999 33.747v-17.5a1.25 1.25 0 0 0-1.25-1.25h-11.25M9.999 11.247h5M12.499 21.247h5M9.999 27.497h5M27.499 27.497h2.5M27.499 21.247h2.5"
    />
  </Svg>
);
