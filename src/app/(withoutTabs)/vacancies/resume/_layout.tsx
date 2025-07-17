import { Stack } from "expo-router";
import { NestedHeaderWithRightLink } from "@/entities/nested-header";

export default function ResumeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: (props) => (
            <NestedHeaderWithRightLink
              withInsets={false}
              headerTitle="Моя анкета"
              rightLinkHref="/(tabs)/profile/(profileTabs)?from=resume"
              rightLinkTitle={`Перейти в \nличный профиль`}
              {...props}
            />
          ),
        }}
      />
    </Stack>
  );
}
