import React, { FC, useState } from "react";
import {
  GestureResponderEvent,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";

export interface IAgreementProps extends TouchableOpacityProps {
  selected: boolean | null;
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  numberOfLines?: number;
  disableShowMore?: boolean;
}

export const AgreementButton: FC<IAgreementProps> = ({
  selected,
  onPress,
  label,
  numberOfLines = 3,
  disableShowMore = false,
  ...props
}) => {
  const [linesLength, setLinesLength] = useState<number | undefined>(
    numberOfLines,
  );

  const handlePressMore = (e: GestureResponderEvent) => {
    if (disableShowMore) {
      onPress(e);
    } else {
      setLinesLength((prev) => (prev === 3 ? undefined : 3));
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      {...props}
      onPress={onPress}
      style={[styles.radioButton, !linesLength && styles.radioButtonFullText]}
    >
      <View
        style={[
          styles.radioButtonIcon,
          selected && styles.radioButtonSelected,
          !linesLength && styles.radioButtonIconFullText,
        ]}
      >
        <View style={styles.radioButtonSelectedInner} />
      </View>
      <View style={styles.labelWrapper}>
        <Text
          style={[
            styles.radioButtonLabel,
            selected && styles.radioButtonLabelSelected,
          ]}
          numberOfLines={!disableShowMore ? linesLength : undefined}
          onPress={handlePressMore}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  radioButtonFullText: {
    alignItems: "flex-start",
  },
  radioButtonIcon: {
    height: 17,
    width: 17,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grayStroke,
  },
  radioButtonIconFullText: {
    ...Platform.select({
      ios: {
        marginTop: 13,
      },
      android: {
        marginTop: 12,
      },
    }),
  },
  radioButtonSelected: {
    backgroundColor: Colors.redAccent,
    borderColor: Colors.redAccent,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelectedInner: {
    width: 10,
    height: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  radioButtonLabel: {
    fontFamily: Fonts.TRegular,
    fontSize: 12,
    color: Colors.grayText,
  },
  radioButtonLabelSelected: {
    color: Colors.black,
  },
  labelWrapper: { gap: 11, flexGrow: 1, flexShrink: 1 },
});
