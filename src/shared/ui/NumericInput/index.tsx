import { FC, useRef } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { ChevronLeft } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface INumericInputProps extends TextInputProps {
  globalValue: number;
  onGlobalValueChange: (value: number) => void;
}

export const NumericInput: FC<INumericInputProps> = ({
  globalValue,
  onGlobalValueChange,
  value,
  ...props
}) => {
  const textInputRef = useRef<TextInput | null>(null);

  return (
    <Pressable
      onPress={() => {
        textInputRef.current?.focus();
      }}
      style={styles.inputContainer}
    >
      <TextInput
        ref={textInputRef}
        value={value}
        keyboardType="numeric"
        style={styles.input}
        {...props}
      />
      <View style={{ gap: 12 }}>
        <Pressable onPress={() => onGlobalValueChange(globalValue + 1)}>
          <ChevronLeft
            style={{ transform: [{ rotate: "90deg" }] }}
            width={24}
            height={24}
            strokeWidth={4}
            stroke={Colors.redAccent}
          />
        </Pressable>
        <Pressable onPress={() => onGlobalValueChange(globalValue - 1)}>
          <ChevronLeft
            style={{ transform: [{ rotate: "270deg" }] }}
            width={24}
            height={24}
            strokeWidth={4}
            stroke={Colors.redAccent}
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: "center",
    width: 148,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: Colors.redAccent,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    fontSize: 24,
    fontFamily: Fonts.TBold,
  },
});
