import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { NestedHeader } from "@/entities/nested-header";
import { Colors } from "@/shared/styles/tokens";

export default function PrivilegesPartnersLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[partner]"
        options={{
          contentStyle: styles.contentContainer,
          header: (props) => (
            <NestedHeader headerTitle="Привилегии" {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="offer"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.white,
  },
});
