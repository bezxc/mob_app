import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { NestedHeader } from "@/entities/nested-header";
import { Colors } from "@/shared/styles/tokens";

export default function GalleryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          contentStyle: styles.contentContainer,
          header: (props) => (
            <NestedHeader headerTitle="Фотогалерея" {...props} />
          ),
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
