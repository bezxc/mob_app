import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

export const PrivilegesBackground = (props: SvgProps) => (
  <Svg width={90} height={108} fill="none" {...props}>
    <G fill="#CF262B" clipPath="url(#a)">
      <Path d="M90 108H73.68l-9.997-37.424h16.32L90 108ZM14.81 70.576.028 14.269.114 0h12.474L31.13 70.576H14.896L24.892 108H8.572L.115 76.215v-5.639H14.81ZM57.446 108h-16.32L31.13 70.576h16.32L57.446 108ZM37.025 32.041h16.32l10.339 38.535H47.449L37.025 32.04Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill="#fff"
          d="M90 44.986c0-13.965 0-20.948-2.28-26.456A30 30 0 0 0 71.47 2.28C65.962 0 58.98 0 45.014 0 31.05 0 24.067 0 18.558 2.28a30 30 0 0 0-16.25 16.25C.028 24.038.028 31.02.028 44.986V54c0 22.498 0 33.748 5.73 41.634a30.016 30.016 0 0 0 6.637 6.637C20.28 108 31.53 108 54.028 108H90V44.986Z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
