import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const EjectIcon = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m10.495 3.297-6.68 7.237a.687.687 0 0 0 .505 1.154h13.36a.688.688 0 0 0 .505-1.154l-6.68-7.237a.687.687 0 0 0-1.01 0v0ZM3.438 15.125v2.063c0 .38.307.687.687.687h13.75c.38 0 .688-.308.688-.688v-2.062a.687.687 0 0 0-.688-.688H4.125a.687.687 0 0 0-.688.688Z"
    />
  </Svg>
);
