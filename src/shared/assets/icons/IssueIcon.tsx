import Svg, { Path, SvgProps } from "react-native-svg";

export const IssueIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 21.125 15 27.688l11.25-6.563"
    />
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 15.5 15 22.063 26.25 15.5"
    />
    <Path
      stroke="#E30613"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 9.875 15 16.438l11.25-6.563L15 3.312 3.75 9.875Z"
    />
  </Svg>
);
