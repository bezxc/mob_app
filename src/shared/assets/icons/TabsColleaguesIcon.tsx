import Svg, { Path, SvgProps } from "react-native-svg";

export const TabsColleaguesIcon = (props: SvgProps) => (
  <Svg width={28} height={28} fill="none" stroke="#999999" {...props}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.625 17.5a5.688 5.688 0 1 0 0-11.375 5.688 5.688 0 0 0 0 11.375ZM16.998 6.337A5.688 5.688 0 1 1 18.541 17.5"
    />
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.75 21.59a9.627 9.627 0 0 1 15.75 0M18.541 17.5a9.614 9.614 0 0 1 7.875 4.09"
    />
  </Svg>
);
