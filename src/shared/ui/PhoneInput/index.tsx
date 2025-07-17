import React, { FC, useRef } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { formatPhoneNumber } from "@/shared/utils";

interface IControlledInputProps extends TextInputProps {
  labelText: string;
  badge?: string;
  isRequired?: boolean;
  labelStyles?: TextStyle;
  containerStyle?: ViewStyle;
}

type TInputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
} & IControlledInputProps;

export const PhoneInput: FC<TInputField> = ({
  labelText,
  name,
  badge,
  isRequired = false,
  labelStyles,
  containerStyle,
  ...props
}) => {
  const {
    fieldState: { error },
    field: { onChange, value, ref, ...otherField },
  } = useController({
    name,
  });

  const textInputRef = useRef<TextInput | null>();

  const handleChange = (text: string) => {
    const formatted = formatPhoneNumber({ text, fromResponse: false });
    onChange(formatted);
  };

  return (
    <Pressable
      onPress={() => {
        textInputRef.current?.focus();
      }}
      style={[styles.container, error?.message ? styles.error : {}]}
    >
      <Text style={[styles.label, labelStyles]}>
        {labelText} {isRequired && <Text style={styles.required}>*</Text>}
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.prefix}>+7</Text>
        <TextInput
          onChangeText={handleChange}
          style={styles.input}
          keyboardType="numeric"
          maxLength={13}
          value={value}
          {...props}
          {...otherField}
          ref={(el) => {
            ref(el);
            textInputRef.current = el;
          }}
        />
      </View>
      {badge && (
        <View style={styles.badgeWrapper}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    gap: 6,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray30,
  },
  required: {
    color: Colors.redAccent,
    fontSize: 13,
  },
  label: {
    fontSize: 13,
    fontFamily: Fonts.TRegular,
    color: Colors.grayText,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  prefix: {
    fontSize: 14,
    fontFamily: Fonts.SFSemiBold,
  },
  input: {
    flexGrow: 1,
    fontSize: 14,
    fontFamily: Fonts.SFSemiBold,
  },
  error: {
    borderColor: Colors.redAccent,
  },
  badgeWrapper: {
    position: "absolute",
    top: -15,
    left: 10,
    backgroundColor: Colors.redAccent,
    borderRadius: 50,
    width: 22,
    height: 22,
    alignItems: "center",
  },
  badgeText: {
    fontFamily: Fonts.TBold,
    fontSize: 14,
    color: Colors.white,
  },
});
