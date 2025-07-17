import Toast from "react-native-toast-message";
import { ZodError } from "zod";

const stepperVoc = {
  first_step: "Шаг 1",
  second_step: "Шаг 2",
  third_step: "Шаг 3",
  fourth_step: "Шаг 4",
};

export const fullStepperErrorHandler = (errors: ZodError) => {
  if (Array.isArray(errors.errors)) {
    const firstError = errors.errors[0];
    console.log(firstError, "hello");
    if (Array.isArray(firstError)) {
      fullStepperErrorHandler(firstError.filter(Boolean)[0]);
      return;
    }
    if (firstError) {
      Toast.show({
        text1: `${stepperVoc[firstError.path[0] as keyof typeof stepperVoc]}. ${firstError.message}`,
        type: "error",
      });
    }
  } else {
    Toast.show({
      text1: errors.message,
      type: "error",
    });
  }
};
