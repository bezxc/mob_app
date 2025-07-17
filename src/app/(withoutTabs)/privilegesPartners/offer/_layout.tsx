import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { NestedHeader } from "@/entities/nested-header";
import { Colors } from "@/shared/styles/tokens";

interface OfferParams {
  offer: string;
  title: string;
}
export default function PrivilegesPartnersOfferLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[offer]"
        options={{
          contentStyle: styles.contentContainer,
          header: (props) => {
            const { title } = props.route.params as OfferParams;
            return (
              <NestedHeader headerTitle={title.toUpperCase()} {...props} />
            );
          },
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
