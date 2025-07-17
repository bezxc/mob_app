import * as React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Path,
  Rect,
  Stop,
  SvgProps,
} from "react-native-svg";

export const CallCenterBackground = (props: SvgProps) => (
  <Svg width={74} height={73} fill="none" {...props}>
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M38.769.434a3 3 0 0 0-3.11 0L5.462 18.736C2.866 20.309 3.98 24.3 7.017 24.3H67.41c3.036 0 4.151-3.992 1.555-5.565L38.768.434Zm-1.555 15.804a3.721 3.721 0 1 0 0-7.443 3.721 3.721 0 0 0 0 7.443Z"
      clipRule="evenodd"
    />
    <Path
      fill="url(#b)"
      d="M3.721 62.274a2 2 0 0 1 2-2h62.365a2 2 0 0 1 2 2v2.962H3.72v-2.962Z"
    />
    <Path
      fill="url(#c)"
      d="M0 67.236a2 2 0 0 1 2-2h70.427a2 2 0 0 1 2 2V73.3H0v-6.063Z"
    />
    <Rect
      width={8.063}
      height={34.733}
      x={25.429}
      y={24.301}
      fill="url(#d)"
      rx={1}
    />
    <Rect
      width={8.063}
      height={34.733}
      x={8.683}
      y={24.301}
      fill="url(#e)"
      rx={1}
    />
    <Rect
      width={8.063}
      height={34.733}
      x={42.175}
      y={24.301}
      fill="url(#f)"
      rx={1}
    />
    <Rect
      width={8.063}
      height={34.733}
      x={58.922}
      y={24.301}
      fill="url(#g)"
      rx={1}
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={32.263}
        x2={32.5}
        y1={0.111}
        y2={28}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFDE9D" />
        <Stop offset={1} stopColor="#DAAF5B" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={30.723}
        x2={30.723}
        y1={60.274}
        y2={65.236}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFDE9D" stopOpacity={0.72} />
        <Stop offset={1} stopColor="#DAAF5B" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={30.282}
        x2={30.282}
        y1={65.236}
        y2={73.299}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFDE9D" stopOpacity={0.72} />
        <Stop offset={1} stopColor="#DAAF5B" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={33.492}
        x2={25.429}
        y1={39.284}
        y2={39.284}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DAAF5B" stopOpacity={0} />
        <Stop offset={1} stopColor="#FFDE9D" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={16.746}
        x2={8.683}
        y1={39.284}
        y2={39.284}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DAAF5B" stopOpacity={0} />
        <Stop offset={1} stopColor="#FFDE9D" />
      </LinearGradient>
      <LinearGradient
        id="f"
        x1={50.239}
        x2={42.175}
        y1={39.284}
        y2={39.284}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DAAF5B" stopOpacity={0} />
        <Stop offset={1} stopColor="#FFDE9D" />
      </LinearGradient>
      <LinearGradient
        id="g"
        x1={66.985}
        x2={58.922}
        y1={39.284}
        y2={39.284}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DAAF5B" stopOpacity={0} />
        <Stop offset={1} stopColor="#FFDE9D" />
      </LinearGradient>
    </Defs>
  </Svg>
);
