import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const HandbagIcon = (props: SvgProps) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.947 6.188H4.053a.688.688 0 0 0-.684.611l-1.222 11a.687.687 0 0 0 .684.764h16.338a.687.687 0 0 0 .684-.764l-1.223-11a.687.687 0 0 0-.683-.612Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.563 8.938v-2.75a3.437 3.437 0 1 1 6.875 0v2.75"
    />
  </Svg>
);
