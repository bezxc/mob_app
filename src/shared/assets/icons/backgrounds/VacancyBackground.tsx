import * as React from "react";
import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  SvgProps,
} from "react-native-svg";

export const VacancyBackground = (props: SvgProps) => (
  <Svg width={93} height={97} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke="url(#b)"
        strokeWidth={4}
        d="M31.248 20.202v-3.66c0-5.659 4.665-10.249 10.416-10.249h9.672c5.751 0 10.416 4.59 10.416 10.249v3.66"
      />
      <Path
        fill="url(#c)"
        d="M1.488 20.132h90.024V89.68c0 4.041-3.333 7.321-7.44 7.321H8.928c-4.107 0-7.44-3.28-7.44-7.32V20.131Z"
      />
      <Path
        fill="url(#d)"
        d="M0 17.204c0-.806.67-1.465 1.488-1.465h90.024c.826 0 1.488.66 1.488 1.465v29.283c0 4.04-3.333 7.32-7.44 7.32H7.44c-4.107 0-7.44-3.28-7.44-7.32V17.204Z"
      />
      <Path
        fill="url(#e)"
        d="M15.624 45.023c0-1.216.997-2.197 2.232-2.197h5.208c1.235 0 2.232.981 2.232 2.197V58.2c0 1.215-.997 2.196-2.232 2.196h-5.208c-1.235 0-2.232-.98-2.232-2.196V45.023Z"
      />
      <Path
        fill="url(#f)"
        d="M67.704 45.023c0-1.216.997-2.197 2.232-2.197h5.208c1.235 0 2.232.981 2.232 2.197V58.2c0 1.215-.997 2.196-2.232 2.196h-5.208c-1.235 0-2.232-.98-2.232-2.196V45.023Z"
      />
      <Path
        fill="url(#g)"
        d="M20.46 46.487c.617 0 1.116.49 1.116 1.098v2.928c0 .608-.498 1.098-1.116 1.098-.617 0-1.116-.49-1.116-1.098v-2.928c0-.608.498-1.098 1.116-1.098Z"
      />
      <Path
        fill="url(#h)"
        d="M72.54 46.487c.617 0 1.116.49 1.116 1.098v2.928c0 .608-.499 1.098-1.116 1.098-.618 0-1.116-.49-1.116-1.098v-2.928c0-.608.498-1.098 1.116-1.098Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={46.5}
        x2={46.5}
        y1={23.497}
        y2={-9.813}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#D86C09" />
        <Stop offset={1} stopColor="#FF820F" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={46.5}
        x2={46.5}
        y1={33.675}
        y2={97}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#D76B08" />
        <Stop offset={1} stopColor="#FF9C40" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={46.5}
        x2={46.5}
        y1={15.739}
        y2={56.523}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#D76B08" />
        <Stop offset={1} stopColor="#FF910F" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={20.46}
        x2={20.46}
        y1={42.826}
        y2={60.396}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F90" />
        <Stop offset={1} stopColor="#E3CF14" />
      </LinearGradient>
      <LinearGradient
        id="f"
        x1={72.54}
        x2={72.54}
        y1={97.366}
        y2={97.366}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F90" />
        <Stop offset={1} stopColor="#E3CF14" />
      </LinearGradient>
      <LinearGradient
        id="g"
        x1={20.46}
        x2={20.46}
        y1={42.826}
        y2={51.611}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DF6F0C" />
        <Stop offset={1} stopColor="#FD9F02" />
      </LinearGradient>
      <LinearGradient
        id="h"
        x1={72.54}
        x2={72.54}
        y1={97.366}
        y2={97.366}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DF6F0C" />
        <Stop offset={1} stopColor="#FD9F02" />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h93v97H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
