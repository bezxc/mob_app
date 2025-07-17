import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NestedHeader } from "@/entities/nested-header";
import { Colors } from "@/shared/styles/tokens";

export default function PrivilegesLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            contentStyle: styles.contentStyle,
            header: (props) => (
              <NestedHeader
                withInsets={false}
                headerTitle="Привилегии"
                {...props}
              />
            ),
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentStyle: {
    backgroundColor: Colors.white,
  },
});
