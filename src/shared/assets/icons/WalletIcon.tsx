import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const WalletIcon = (props: SvgProps) => (
  <Svg
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.375 7v14a1.75 1.75 0 0 0 1.75 1.75h17.5a.875.875 0 0 0 .875-.875V9.625a.875.875 0 0 0-.875-.875h-17.5A1.75 1.75 0 0 1 4.375 7Zm0 0a1.75 1.75 0 0 1 1.75-1.75H21"
    />
    <Path
      fill="#E30613"
      d="M19.688 16.625a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75Z"
    />
  </Svg>
);
