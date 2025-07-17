import { Calendar } from "lucide-react-native";
import { forwardRef, useEffect, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import dayjs from "@/shared/lib/dayjs";
import { Colors, Fonts } from "@/shared/styles/tokens";

interface IDatePickerProps extends TouchableOpacityProps {
  label: string;
  date: string | null;
  badge?: string;
  labelStyle?: TextStyle;
  isRequired?: boolean;
  setDate: (value: Date | null) => void;
  calendarIconColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const DateInput = ({
  date,
  setDate,
  ...props
}: Pick<IDatePickerProps, "date" | "setDate"> & TextInputProps) => {
  const [fieldDate, setFieldDate] = useState<string | null>(date);

  const handleChange = (text: string) => {
    let cleaned = text.replace(/[^0-9]/g, "");

    if (text.length === 0) {
      setDate(null);
      setFieldDate(null);
      return;
    }

    if (cleaned.length > 8) return;

    if (fieldDate && fieldDate.length > text.length) {
      setFieldDate(text);
    } else {
      if (cleaned.length >= 2) {
        cleaned = cleaned.slice(0, 2) + "." + cleaned.slice(2);
      }
      if (cleaned.length >= 5) {
        cleaned = cleaned.slice(0, 5) + "." + cleaned.slice(5, 9);
      }

      setFieldDate(cleaned);

      if (cleaned.length === 10) {
        setDate(dayjs(cleaned, "DD.MM.YYYY").toDate());
      }
    }
  };

  useEffect(() => {
    if (date || date === null) {
      console.log("useEffect");
      setFieldDate(date);
    }
  }, [date]);

  return (
    <TextInput
      {...props}
      value={fieldDate || ""}
      onChangeText={handleChange}
      keyboardType="numeric"
      maxLength={10}
      placeholder="ДД.ММ.ГГГГ"
      placeholderTextColor={Colors.black}
    />
  );
};

export const DatePicker = forwardRef<View, IDatePickerProps>(
  (
    {
      label,
      date,
      setDate,
      badge,
      style,
      labelStyle,
      isRequired,
      calendarIconColor = Colors.grayTextDark,
      containerStyle,
      ...props
    },
    ref,
  ) => {
    return (
      <View style={[styles.datePickerContainer, containerStyle]} ref={ref}>
        <Text style={[styles.label, labelStyle]}>
          {label} {isRequired && <Text style={styles.required}>*</Text>}
        </Text>
        <View style={[styles.datePickerInput, style]}>
          <DateInput style={styles.dateInput} date={date} setDate={setDate} />
          <TouchableOpacity {...props}>
            <Calendar color={calendarIconColor} />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  datePickerContainer: {
    position: "relative",
    borderWidth: 1,
    borderColor: Colors.grayLight,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: "space-between",
    gap: 5,
  },
  required: {
    color: Colors.redAccent,
    fontSize: 13,
  },
  datePickerInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    backgroundColor: Colors.white,
    gap: 30,
    paddingHorizontal: 20,
  },
  dateInput: {
    paddingVertical: 6,
    flexGrow: 1,
  },
  label: {
    color: Colors.grayText,
    fontFamily: Fonts.TRegular,
    fontSize: 13,
  },
  date: {
    fontFamily: Fonts.TRegular,
    fontSize: 14,
    flex: 1,
  },
});
