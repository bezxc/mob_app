import * as React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
  SvgProps,
} from "react-native-svg";

export const PrivilegeBackground = (props: SvgProps) => (
  <Svg width={95} height={73} fill="none" {...props}>
    <Path fill="url(#a)" d="M47.493 0 70.72 28.427H24.267L47.493 0Z" />
    <Path fill="url(#b)" d="M47.493 78 70.72 28.427H24.267L47.493 78Z" />
    <Path fill="url(#c)" d="M47.493 78 24.267 28.427H0L47.493 78Z" />
    <Path fill="url(#d)" d="M47.493 78 70.72 28.427h24.267L47.493 78Z" />
    <Path fill="url(#e)" d="m18.72 4.16 5.547 24.267H0L18.72 4.16Z" />
    <Path fill="url(#f)" d="m76.139 4.16-5.42 24.267h24.268L76.139 4.16Z" />
    <Path fill="url(#g)" d="M47.493 0 24.267 28.427 18.72 4.16 47.493 0Z" />
    <Path fill="url(#h)" d="M47.493 0 70.72 28.427 76.139 4.16 47.493 0Z" />
    <Defs>
      <LinearGradient
        id="a"
        x1={33.627}
        x2={33.956}
        y1={27.04}
        y2={-9.156}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#00D1FF" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={47.84}
        x2={51.052}
        y1={28.427}
        y2={76.398}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#00E0FF" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={28.427}
        x2={21.329}
        y1={26.693}
        y2={0.238}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#00D1FF" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="f"
        x1={70.72}
        x2={81.517}
        y1={28.427}
        y2={0.233}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#00D1FF" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="g"
        x1={24.613}
        x2={43.68}
        y1={28.427}
        y2={-4.507}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#00D1FF" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="h"
        x1={70.272}
        x2={51.163}
        y1={28.427}
        y2={-4.433}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#00D1FF" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
      <RadialGradient
        id="c"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(22.18664 49.57332 -22.72114 10.1689 24.613 28.427)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#00D1FF" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </RadialGradient>
      <RadialGradient
        id="d"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-21.84021 57.19986 -26.21665 -10.01012 70.027 20.8)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#00D1FF" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </RadialGradient>
    </Defs>
  </Svg>
);
