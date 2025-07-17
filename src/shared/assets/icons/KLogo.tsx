import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

type IKLogoProps = {
  pathFill?: string;
} & SvgProps;

export const KLogo: React.FC<IKLogoProps> = ({
  pathFill = "#fff",
  ...props
}) => (
  <Svg width={182} height={195} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={pathFill}
        d="M179.764 0h-43.981c-.921 0-1.841.73-2.209 1.643L107.811 96.77c-.184.547-.552.73-1.104.73H62.541c-.736 0-1.288-.73-1.104-1.46l12.145-44.551c.368-1.46-.736-2.739-2.208-2.739H27.576c-.92 0-1.84.73-2.208 1.643L-.027 143.511c-.368 1.461.736 2.739 2.208 2.739h43.982c.92 0 1.84-.73 2.208-1.643l11.962-44.186c.184-.365.736-.365.92 0l25.211 93.118c.184.913 1.104 1.644 2.208 1.644h43.982c1.472 0 2.577-1.461 2.208-2.739l-25.763-94.396c0-.365.184-.548.368-.548h44.902c.92 0 1.84-.73 2.208-1.643l25.396-93.118C182.341 1.46 181.237 0 179.764 0Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={pathFill} d="M0 0h182v195H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
