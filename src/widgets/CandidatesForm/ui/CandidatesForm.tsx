import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { ControlledSelect } from "@/entities/controlled-select";
import { ControlledDatePicker } from "@/features/controlled-datepicker";
import { Colors, Fonts } from "@/shared/styles/tokens";
import {
  ControlledInput,
  FormInfoLabel,
  FormLink,
  LinearGradientButton,
  PhoneInput,
  Select,
} from "@/shared/ui";
import { formatPhoneNumber } from "@/shared/utils";
import {
  CandidatesFormSchema,
  ICandidatesFormSchemaInitialType,
  ICandidatesFormSchemaType,
} from "../model/CandidatesForm.schema";

// TODO: Если будет потребность в этом, то доделать)))
export const CandidatesForm = () => {
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Данные загружены",
    });
  };

  const methods = useForm<
    ICandidatesFormSchemaInitialType,
    unknown,
    ICandidatesFormSchemaType
  >({
    resolver: zodResolver(CandidatesFormSchema),
    values: {
      appliedVacancy: "",
      fio: "",
      phone: formatPhoneNumber({ text: "+72345678901" }),
      birthday: null,
      familyStatus: null,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ICandidatesFormSchemaType> = async (
    newData,
  ) => {
    console.log("Form Data", newData);
  };

  return (
    <TouchableWithoutFeedback onPressOut={() => Keyboard.dismiss()}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>
          Уважаемый коллега! Эта анкета – Ваша возможность заявить о себе, как о
          лучшем кандидате на вакантную позицию Компании.
        </Text>
        <TouchableOpacity onPress={showToast} style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>
            Загрузить данные из моей анкеты
          </Text>
        </TouchableOpacity>
        <FormProvider {...methods}>
          <ControlledInput
            badge="1"
            name="appliedVacancy"
            labelText="На какую вакансию вы претендуете"
          />
          <ControlledInput
            badge="2"
            name="fio"
            labelText="Фамилия Имя Отчество"
            isRequired
          />
          <PhoneInput
            name="phone"
            labelText="Номер телефона"
            badge="3"
            isRequired
          />

          <ControlledDatePicker
            badge="4"
            name="birthday"
            label="Дата рождения"
          />
          <View style={styles.itemWrapper}>
            <FormInfoLabel
              label="Укажите последние 3 - 4 места работы, включая перемещения внутри Компании"
              badge="5"
              isRequired
            />
            <FormLink
              title="Менеджер по продажам"
              description="ООО Химстрой.  26.01.2018 > 10.08.2021"
              link="/"
            />
            <FormLink title="Добавить место работы" link="/" isNew />
          </View>
          {/* Здесь очень хорошо надо подумать как будем коннектить с reactHookForm */}
          <Select label="Укажите вашего текущего руководителя" value="" />

          <ControlledSelect
            name="familyStatus"
            options={[
              { value: "1", label: "Женат / Замужем" },
              { value: "2", label: "Не женат / Не замужем" },
            ]}
            label="Cемейное положение"
            badge="8"
          />
        </FormProvider>
        <Text style={styles.policyText}>
          Нажимая на кнопку “Отправить заявку” Я даю согласие отделу кадров на{" "}
          <Text style={styles.policyTextBorder}>условия обработки</Text> своих
          персональных данных
        </Text>

        <LinearGradientButton
          onPress={handleSubmit(onSubmit)}
          text="Отправить заявку"
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 25,
    paddingBottom: 32,
  },
  title: {
    fontFamily: Fonts.TRegular,
    fontSize: 15,
    color: Colors.grayText,
  },
  downloadButton: {
    borderRadius: 20,
    backgroundColor: Colors.grayLight,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  downloadButtonText: {
    fontFamily: Fonts.TBold,
    fontSize: 15,
    lineHeight: 18,
    color: Colors.grayText,
  },
  policyText: {
    alignSelf: "center",
    fontFamily: Fonts.TRegular,
    fontSize: 13,
    color: Colors.grayText,
  },
  policyTextBorder: {
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  itemWrapper: {
    gap: 10,
  },
});
