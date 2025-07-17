import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { ProfileHeader } from "../ui/ProfileHeader";

export const useProfileHeaderVariant = () => {
  const { from } = useLocalSearchParams<{ from: string }>();

  const navigation = useNavigation();

  useFocusEffect(() => {
    if (from === "resume") {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "none" },
      });
      navigation.setOptions({
        header: () => <ProfileHeader withBackButton />,
      });
    }
  });
};
