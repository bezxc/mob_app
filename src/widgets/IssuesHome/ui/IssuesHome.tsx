import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IssueIcon, SendIssueIcon } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";

export const IssuesHome = () => {
  const onPress = (path: "issues" | "sendIssue") => {
    router.push(`/(withoutTabs)/issuesPage/${path}`);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => onPress("sendIssue")}
      >
        <View style={styles.buttonInner}>
          <SendIssueIcon style={styles.iconContainer} />
          <Text style={styles.title}>Отправить обращение</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => onPress("issues")}
      >
        <View style={styles.buttonInner}>
          <IssueIcon style={styles.iconContainer} />
          <Text style={styles.title}>Мои обращения</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.gray50,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 22,
  },
  iconContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontFamily: Fonts.TBold,
    fontSize: 16,
  },
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
