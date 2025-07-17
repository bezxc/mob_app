import { Stack } from "expo-router";
import { ProfileHeader } from "@/entities/profile-header";

export default function ProfileTab() {
  return (
    <Stack>
      <Stack.Screen
        name="(profileTabs)"
        options={{ header: () => <ProfileHeader /> }}
      />
    </Stack>
  );
}
