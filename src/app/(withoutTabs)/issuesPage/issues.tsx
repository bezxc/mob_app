import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { clearFilters } from "@/entities/issues";
import { IssuesList } from "@/widgets/IssuesList";

const Issues = () => {
  useEffect(() => {
    return () => {
      clearFilters();
    };
  }, []);
  return (
    <View style={styles.container}>
      <IssuesList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
});

export default Issues;
