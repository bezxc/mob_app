import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { NestedHeader } from "@/entities/nested-header";
import { Colors, Fonts } from "@/shared/styles/tokens";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          contentStyle: styles.container,
          header: (props) => (
            <NestedHeader
              headerTitle="Фильтр приказов"
              backWithDesc
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="edoDocumentsFiltersAutocomplete"
        options={{
          headerShown: false,
          presentation: "modal",
          header: (props) => (
            <NestedHeader
              headerTitle="Фильтр приказов"
              backWithDesc
              {...props}
            />
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 21,
    paddingBottom: 29,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontFamily: Fonts.TRegular,
    fontSize: 22,
    fontWeight: "700",
    justifyContent: "center",
  },
});
