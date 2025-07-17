import { FC } from "react";
import { AvatarImage } from "./AvatarImage";

interface TabBarAvatarImageProps {
  full_name: string;
  kan_uid: number | string;
}

export const TabBarAvatarImage: FC<TabBarAvatarImageProps> = ({
  full_name,
  kan_uid,
}) => {
  return (
    <AvatarImage
      full_name={full_name}
      kan_uid={kan_uid}
      imageStyle={{ width: 32, height: 32 }}
      skeletonTextStyle={{ fontSize: 16 }}
    />
  );
};
