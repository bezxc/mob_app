import { FieldErrors, FieldValues, SubmitErrorHandler } from "react-hook-form";
import Toast from "react-native-toast-message";

type FormErrorHandler = <TFieldValues extends FieldValues>(
  errors: FieldErrors<TFieldValues>
) => void;

export const formErrorHandler: SubmitErrorHandler<FormErrorHandler> = (
  errors
) => {
  const arrayOfErrors = Object.values(errors);
  const firstError = arrayOfErrors[0];
  if (Array.isArray(firstError)) {
    formErrorHandler(firstError.filter(Boolean)[0]);
    return;
  }
  if (firstError) {
    Toast.show({
      text1: firstError.message,
      type: "error",
    });
  }
};
