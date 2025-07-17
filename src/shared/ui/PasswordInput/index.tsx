import { FC, useRef, useState } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import { LockOpenIcon } from "@/shared/assets/icons";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface IPasswordInputProps extends TextInputProps {
  logo?: React.JSX.Element;
  labelText: string;
  labelStyle?: TextStyle;
}

type TInputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
} & IPasswordInputProps;

export const PasswordInput: FC<TInputField> = ({
  logo,
  style,
  labelText,
  name,
  labelStyle,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {
    fieldState: { error },
    field: { onChange, ref, ...otherField },
  } = useController({
    name,
  });
  const textInputRef = useRef<TextInput | null>();
  return (
    <Pressable
      onPress={() => {
        textInputRef.current?.focus();
      }}
      style={[
        styles.container,
        style as StyleProp<ViewStyle>,
        error?.message ? styles.error : {},
      ]}
    >
      <Text nativeID="labelUsername" style={[styles.label, labelStyle]}>
        {labelText}
      </Text>
      <TextInput
        aria-labelledby="labelUsername"
        style={styles.input}
        secureTextEntry={!isPasswordVisible}
        placeholderTextColor={Colors.gray}
        onChangeText={onChange}
        ref={(el) => {
          ref(el);
          textInputRef.current = el;
        }}
        {...props}
        {...otherField}
      />
      <Pressable
        onPress={() => setIsPasswordVisible((state) => !state)}
        style={styles.icon}
      >
        <LockOpenIcon stroke={Colors.gray70} />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 21,
    paddingRight: 55,
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  error: {
    borderColor: "orange",
  },
  label: {
    color: Colors.gray,
    fontWeight: "regular",
    fontSize: 13,
    marginBottom: 5,
  },
  input: {
    fontSize: 13,
    color: Colors.black,
    fontFamily: Fonts.TBold,
  },
  icon: {
    position: "absolute",
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
});
