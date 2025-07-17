import { FieldValues } from "react-hook-form";
import Toast from "react-native-toast-message";

export const formErrorHandler = <T extends FieldValues>(
  errors: Partial<T>
): void => {
  const errorMessages = Object.values(errors).map((error) => {
    if (Array.isArray(error)) {
      return error[0]?.message;
    }
    return error?.message;
  });
  Toast.show({
    type: "error",
    text1: "Ошибка валидации",
    text2: errorMessages[0] || "Заполните все поля",
  });
};
