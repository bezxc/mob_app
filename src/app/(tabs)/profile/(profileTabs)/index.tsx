import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "@/shared/styles/tokens";
import { PersonalInfoWidget } from "@/widgets/PersonalInfo";

const PersonalInfo = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        keyboardShouldPersistTaps={Platform.OS === "android"}
        automaticallyAdjustKeyboardInsets={true}
        keyboardDismissMode="on-drag"
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <PersonalInfoWidget />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
