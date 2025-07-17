import dayjs from "dayjs";
import { FC, useId } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import DatePicker, { DatePickerProps } from "react-native-date-picker";
import { ModalPicker, toggleModalPicker } from "@/entities/modal-picker";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { DatePicker as DatePickerComponent } from "@/shared/ui";

interface IControlledDatePickerProps extends Omit<DatePickerProps, "date"> {
  label: string;
  badge?: string;
  labelStyle?: TextStyle;
  miniVariant?: boolean;
}

type TControlledDatePickerField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  datePickerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  isRequired?: boolean;
} & IControlledDatePickerProps;

export const ControlledDatePicker: FC<TControlledDatePickerField> = ({
  style,
  name,
  label,
  badge,
  datePickerStyle,
  labelStyle,
  isRequired,
  containerStyle,
  miniVariant = true,
  ...props
}) => {
  const {
    fieldState: { error },
    field: { onChange, ref, value, ...otherField },
  } = useController({
    name,
  });

  const id = useId();

  const safeDate = () => {
    toggleModalPicker(name + id);
  };

  const cancelData = () => {
    onChange(null);
    toggleModalPicker(name + id);
  };

  return (
    <View>
      <DatePickerComponent
        {...otherField}
        isRequired={isRequired}
        onPress={() => toggleModalPicker(name + id)}
        style={[
          datePickerStyle,
          miniVariant && error && styles.datepickerError,
        ]}
        containerStyle={[
          containerStyle,
          !miniVariant && error && styles.datepickerError,
        ]}
        badge={badge}
        label={label}
        date={value ? dayjs(value).format("DD.MM.YYYY") : null}
        setDate={onChange}
        labelStyle={labelStyle}
        ref={ref}
      />
      <ModalPicker name={name + id}>
        <View>
          <View style={styles.datePickerContainer}>
            <DatePicker
              {...props}
              {...otherField}
              date={value ? new Date(value) : new Date()}
              onDateChange={onChange}
              mode="date"
              locale="ru"
              theme="light"
              maximumDate={new Date()}
            />
          </View>
          <Pressable
            onPress={safeDate}
            style={[styles.modalButton, styles.acceptBtnStyle]}
          >
            <Text style={styles.modalBtnText}>Сохранить</Text>
          </Pressable>
          <Pressable
            onPress={cancelData}
            style={[styles.modalButton, styles.cancelBtnStyle]}
          >
            <Text style={[styles.modalBtnText, styles.cancelTextStyle]}>
              Очистить
            </Text>
          </Pressable>
        </View>
      </ModalPicker>
    </View>
  );
};

const styles = StyleSheet.create({
  datepickerError: {
    borderColor: Colors.redAccent,
    borderWidth: 1,
  },
  cancelTextStyle: {
    color: Colors.redAccent,
  },
  cancelBtnStyle: {
    marginTop: 4,
    borderRadius: 10,
  },
  modalBtnText: {
    fontFamily: Fonts.TRegular,
    color: Colors.black,
    fontSize: 13,
    textTransform: "uppercase",
  },
  acceptBtnStyle: {
    marginTop: 1,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  modalButton: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  datePickerContainer: {
    paddingVertical: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: "center",
  },
});
