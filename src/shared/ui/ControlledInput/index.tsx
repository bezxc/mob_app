import { forwardRef, useRef } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
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

interface IControlledInputProps extends Omit<TextInputProps, "style"> {
  logo?: React.JSX.Element;
  maxLength?: number;
  labelText?: string;
  inputStyle?: StyleProp<TextStyle>;
  badge?: string;
  isRequired?: boolean;
  withError?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  onCustomChange?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

type TInputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
} & IControlledInputProps;

export const ControlledInput = forwardRef<TextInput, TInputField>(
  (
    {
      logo,
      style,
      labelText,
      maxLength,
      inputStyle,
      labelStyle,
      name,
      badge,
      isRequired = false,
      withError = true,
      onCustomChange,
      ...props
    },
    ref,
  ) => {
    const {
      fieldState: { error },
      field: { onChange, ref: fieldRef, value, ...otherField },
    } = useController({
      name,
    });

    const textInputRef = useRef<TextInput | null>(null);

    return (
      <Pressable
        onPress={() => {
          textInputRef.current?.focus();
        }}
        style={[
          styles.container,
          style,
          error?.message && withError ? styles.error : {},
          logo && styles.containerWithLogo,
        ]}
      >
        {labelText && (
          <Text style={[styles.label, labelStyle]}>
            {labelText} {isRequired && <Text style={styles.required}>*</Text>}
          </Text>
        )}
        <TextInput
          style={[styles.input, inputStyle]}
          placeholderTextColor={Colors.gray}
          onChangeText={(val) => {
            onChange(val);
            onCustomChange?.(val);
          }}
          value={value ? String(value) : ""}
          maxLength={maxLength}
          {...otherField}
          {...props}
          ref={(el) => {
            if (typeof ref === "function") {
              ref(el);
            } else if (ref) {
              (ref as React.MutableRefObject<TextInput | null>).current = el;
            }
            fieldRef(el);
            textInputRef.current = el;
          }}
        />
        {logo && <View style={styles.icon}>{logo}</View>}
        {badge && (
          <View style={styles.badgeWrapper}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingLeft: 21,
    paddingRight: 21,
    paddingVertical: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.grayLight,
  },
  containerWithLogo: {
    paddingRight: 55,
  },
  error: {
    borderColor: Colors.redAccent,
  },
  required: {
    color: Colors.redAccent,
    fontSize: 13,
  },
  label: {
    color: Colors.grayText,
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
