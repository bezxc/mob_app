import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { CustomSwitch } from "@/shared/ui";

interface IProfileSettingsSwitch {
  title: string;
  description: string;
  queryFn?: () => void;
}

export const ProfileSettingsSwitch: FC<IProfileSettingsSwitch> = ({
  title,
  description,
  queryFn,
}) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <CustomSwitch onValueChange={queryFn} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.graySeparator,
  },
  textWrapper: {
    gap: 3,
    flexBasis: "85%",
  },
  title: {
    fontFamily: Fonts.TBold,
    fontSize: 14,
  },
  description: {
    fontFamily: Fonts.TRegular,
    fontSize: 12,
    color: Colors.grayText,
  },
});
