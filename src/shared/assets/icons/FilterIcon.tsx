import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const FilterIcon = (props: SvgProps) => (
  <Svg width={19} height={17} fill="none" {...props}>
    <Path
      fill="#E30613"
      d="M18.17 0H1.016a.58.58 0 0 0-.404.163.548.548 0 0 0-.168.393v.927a.97.97 0 0 0 .304.706l6.558 6.467v5.666l1.144.422v-6.41a.542.542 0 0 0-.166-.395l-6.696-6.5V1.11h16.01v.339l-6.672 6.489a.556.556 0 0 0-.19.394v7.34l1.144.438v-7.5l6.559-6.389a1.003 1.003 0 0 0 .303-.722V.556a.548.548 0 0 0-.167-.393A.58.58 0 0 0 18.17 0Z"
    />
  </Svg>
);
