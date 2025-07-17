import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useUnit } from "effector-react";
import { Dispatch, FC, SetStateAction } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { CompactControlledSelect } from "@/entities/controlled-select";
import { createRelative, updateRelative } from "@/entities/profile";
import { ControlledDatePicker } from "@/features/controlled-datepicker";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";
import { GradientButton } from "@/shared/ui";
import { ControlledInput } from "@/shared/ui/ControlledInput";
import { getChangedFormFieldsDeep } from "@/shared/utils";
import {
  IRelativeDegreeType,
  IRelativeFormSchemaType,
  IRelativeInitialFromSchemaType,
  RelativeFormSchema,
} from "../model/RelativeForm.schema";

interface IRelativeForm {
  birthDay?: Date;
  fullName?: string;
  degree?: "Son" | "Daughter" | "Mother" | "Father" | "Husband" | "Wife";
  edit?: boolean;
  setEdit?: Dispatch<SetStateAction<boolean>>;
  id?: number;
  setIsVisibleForm?: Dispatch<SetStateAction<boolean>>;
  isVisibleForm?: boolean;
}

const selectValues: IRelativeDegreeType[] = [
  {
    label: "Сын",
    value: "Son",
  },
  {
    label: "Дочь",
    value: "Daughter",
  },
  {
    label: "Мать",
    value: "Mother",
  },
  {
    label: "Отец",
    value: "Father",
  },
  {
    label: "Муж",
    value: "Husband",
  },
  {
    label: "Жена",
    value: "Wife",
  },
];

export const RelativeForm: FC<IRelativeForm> = ({
  birthDay,
  fullName,
  degree,
  setEdit,
  edit,
  id,
  setIsVisibleForm,
}) => {
  const { kanUid } = useUnit($auth);
  const queryClient = useQueryClient();

  const methods = useForm<
    IRelativeInitialFromSchemaType,
    unknown,
    IRelativeFormSchemaType
  >({
    resolver: zodResolver(RelativeFormSchema),
    defaultValues: {
      birthDay,
      fullName,
      degree: degree && selectValues.find((item) => item.value === degree),
    },
  });

  const {
    handleSubmit,
    formState: { dirtyFields, errors },
    reset,
  } = methods;

  const { mutate: updateRelativeMutate } = useMutation({
    mutationFn: async (relative: Partial<IRelativeFormSchemaType>) => {
      const degreeValue = relative.degree ? relative.degree.value : undefined;

      return updateRelative(String(id))({
        birthday: dayjs(relative.birthDay).format("YYYY-MM-DD").toString(),
        degree: degreeValue,
        full_name: relative.fullName,
      });
    },

    onSuccess: () => {
      reset();
      if (setEdit) {
        setEdit(false);
      }
      queryClient.invalidateQueries({ queryKey: ["relatives", { kanUid }] });
    },
    onError: ({ message }) => {
      Toast.show({
        type: "error",
        text1: "Произошла ошибка",
        text2: message,
      });
    },
  });

  const { mutate: createRelativeMutate } = useMutation({
    mutationFn: async (
      relative: IRelativeFormSchemaType & { user_kan_uid: number },
    ) =>
      createRelative({
        birthday: dayjs(relative.birthDay).format("YYYY-MM-DD").toString(),
        degree: relative.degree.value,
        full_name: relative.fullName,
        user_kan_uid: relative.user_kan_uid,
      }),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["relatives", { kanUid }] });
      if (setIsVisibleForm) setIsVisibleForm(false);
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Произошла ошибка",
        text2: "Родственник с такими данными уже существует",
      });
    },
  });

  const onSubmit: SubmitHandler<IRelativeFormSchemaType> = async (newData) => {
    if (edit) {
      const changedFields = getChangedFormFieldsDeep(newData, dirtyFields);

      updateRelativeMutate(changedFields);
    } else {
      createRelativeMutate({
        ...newData,
        user_kan_uid: Number(kanUid),
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <CompactControlledSelect
          style={{
            backgroundColor: Colors.grayLight,
            paddingVertical: 5,
            paddingHorizontal: 0,
          }}
          options={selectValues}
          name="degree"
          label="Степень родства"
        />

        <ControlledInput
          inputStyle={[
            styles.inputStyles,
            errors.fullName?.message
              ? { borderWidth: 1, borderColor: Colors.redAccent }
              : null,
          ]}
          labelStyle={styles.label}
          style={styles.fullName}
          name="fullName"
          labelText="ФИО"
          withError={false}
        />
        <View style={styles.buttonsContainer}>
          <ControlledDatePicker
            style={styles.datePicker}
            datePickerStyle={{ minWidth: "60%" }}
            name="birthDay"
            label="День рождения"
            labelStyle={styles.label}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <GradientButton
            onPress={() => {
              if (setEdit) {
                setEdit(false);
              }
              if (setIsVisibleForm) {
                setIsVisibleForm(false);
              }
            }}
            gradientStyles={{ padding: 13 }}
            colors={["#1D77ED", "#56A0FF", "#2572D6"]}
            style={{ flexGrow: 1 }}
          >
            Отменить
          </GradientButton>
          <GradientButton
            onPress={handleSubmit(onSubmit)}
            gradientStyles={{ padding: 13 }}
            style={{ flexGrow: 1 }}
          >
            Сохранить
          </GradientButton>
        </View>
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.grayLight,
    borderRadius: 20,
  },
  fullName: {
    paddingVertical: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
  inputStyles: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  label: {
    color: Colors.gray70,
    fontFamily: Fonts.SFSemiBold,
  },
  datePicker: {
    minWidth: 90,
    paddingTop: 0,
    paddingBottom: 0,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  genderIcon: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
