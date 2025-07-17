import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { DepartmentsList } from "@/widgets/DepartmentsList";
import { ManagementsList } from "@/widgets/ManagementsList";
import { OrganizationList } from "@/widgets/OrganizationList";
import { PositionsList } from "@/widgets/PositionsList";

const PositionsFilterList = () => {
  const { searchParam } = useLocalSearchParams<{ searchParam: string }>();

  return (
    <View style={styles.container}>
      {searchParam === "position" && <PositionsList />}
      {searchParam === "management" && <ManagementsList />}
      {searchParam === "organization" && <OrganizationList />}
      {searchParam === "department" && <DepartmentsList />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default PositionsFilterList;
