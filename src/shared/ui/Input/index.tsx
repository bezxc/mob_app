import { FC, useRef } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";

export interface IInputProps extends TextInputProps {
  logo?: React.JSX.Element;
  labelText?: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  logoStyle?: StyleProp<ViewStyle>;
}

export const Input: FC<IInputProps> = ({
  logo,
  style,
  labelText,
  labelStyle,
  containerStyle,
  logoStyle,
  ...props
}) => {
  const textInputRef = useRef<TextInput | null>(null);
  return (
    <Pressable
      onPress={() => textInputRef.current?.focus()}
      style={[
        styles.container,
        logo && styles.containerWithIcon,
        containerStyle,
      ]}
    >
      {labelText && <Text style={[styles.label, labelStyle]}>{labelText}</Text>}
      <TextInput
        {...props}
        ref={textInputRef}
        style={[styles.input, style]}
        placeholderTextColor={Colors.gray}
      />
      {logo && <View style={[styles.eyeIcon, logoStyle]}>{logo}</View>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 21,
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  containerWithIcon: {
    paddingRight: 55,
  },
  label: {
    color: Colors.gray,
    fontWeight: "regular",
    fontSize: 13,
    marginBottom: 5,
  },
  input: {
    fontSize: 13,
    color: Colors.white,
    fontFamily: Fonts.TBold,
  },
  eyeIcon: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
});
