import dayjs from "dayjs";
import { FC } from "react";
import {
  Pressable,
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

interface IFiltersDatepickerProps extends Omit<DatePickerProps, "date"> {
  label: string;
  badge?: string;
  labelStyle?: TextStyle;
  onChange: (value: Date | null) => void;
  isRequired?: boolean;
  datePickerStyle?: ViewStyle;
  value?: string | null;
  modalName: string;
}

export const FiltersDatepicker: FC<IFiltersDatepickerProps> = ({
  style,
  label,
  badge,
  value,
  onChange,
  modalName,
  datePickerStyle,
  labelStyle,
  isRequired,
  ...props
}) => {
  const safeDate = () => {
    toggleModalPicker(modalName);
  };

  const cancelData = () => {
    onChange(null);
    toggleModalPicker(modalName);
  };

  return (
    <View>
      <DatePickerComponent
        isRequired={isRequired}
        onPress={() => toggleModalPicker(modalName)}
        style={datePickerStyle}
        badge={badge}
        label={label}
        date={value ? dayjs(value).format("DD.MM.YYYY") : null}
        setDate={onChange}
        labelStyle={labelStyle}
        calendarIconColor={Colors.redAccent}
      />
      <ModalPicker name={modalName}>
        <View>
          <View style={styles.datePickerContainer}>
            <DatePicker
              {...props}
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
