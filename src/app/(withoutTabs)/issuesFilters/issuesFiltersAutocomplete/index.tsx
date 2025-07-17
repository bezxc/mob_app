import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { IssuesCategoriesFilterList } from "@/widgets/IssuesCategoriesFilterList";
import { IssuesStatusFilterList } from "@/widgets/IssuesStatusFilterList";

const IssuesFiltersList = () => {
  const { searchParam } = useLocalSearchParams<{ searchParam: string }>();

  return (
    <View style={styles.container}>
      {searchParam === "categories" && <IssuesCategoriesFilterList />}
      {searchParam === "status" && <IssuesStatusFilterList />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default IssuesFiltersList;
