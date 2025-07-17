import { StyleSheet } from "react-native";
import { Colors } from "@/shared/styles/tokens";

export const actionSheetStyles = StyleSheet.create({
  actionSheetContainerStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 0,
    alignItems: "center",
  },
  actionSheetSeparatorStyle: {
    minWidth: "100%",
    height: 1,
    backgroundColor: "#eee",
  },
  actionSheetTextStyle: {
    flexGrow: 1,
    fontSize: 15,
    color: Colors.black,
    textAlign: "center",
  },
});
