import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUnit } from "effector-react";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { getColleagueInfoV2 } from "@/entities/colleagues";
import { setUserInfo } from "@/entities/profile";
import { $auth } from "@/shared/api/auth.store";
import { Colors, Fonts } from "@/shared/styles/tokens";
import {
  AccordionItem,
  ControlledInput,
  GradientButton,
  InputInfo,
  PhoneInput,
} from "@/shared/ui";
import { formatPhoneNumber } from "@/shared/utils";
import {
  IPersonalInfoSchemaInitialType,
  IPersonalInfoSchemaType,
  PersonalInfoSchema,
} from "../model/PersonalInfoForm.schema";

export const PersonalInfoForm = () => {
  const { kanUid } = useUnit($auth);
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);
  const open = useSharedValue(openAccordion);

  const { data: user } = useQuery({
    queryKey: ["user", { kanUid }],
    queryFn: () => getColleagueInfoV2({ kan_uid: kanUid as string }),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: {
      work_phone?: string;
      telegram?: string;
      internal_phone?: string;
      home_phone?: string;
    }) => setUserInfo(kanUid)({ ...data }),
    onSuccess: () => {
      Toast.show({
        text1: "Успешно",
        text2: "Ваши данные обновлены",
      });
      queryClient.invalidateQueries({ queryKey: ["user", { kanUid }] });
    },
  });

  const onPress = () => {
    open.value = !open.value;
    setOpenAccordion((prev) => !prev);
  };

  const {
    home_phone = "",
    internal_phone = "",
    work_phone = "",
    telegram = "",
  } = user || {};

  const methods = useForm<
    IPersonalInfoSchemaInitialType,
    unknown,
    IPersonalInfoSchemaType
  >({
    resolver: zodResolver(PersonalInfoSchema),
    values: {
      homePhone: formatPhoneNumber({ text: home_phone, fromResponse: true }),
      workPhone: formatPhoneNumber({ text: work_phone, fromResponse: true }),
      internalPhone: internal_phone,
      telegram,
    },
  });

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const onSubmit: SubmitHandler<IPersonalInfoSchemaType> = async (newData) => {
    mutate({
      home_phone: newData.homePhone,
      internal_phone: newData.internalPhone,
      telegram: newData.telegram,
      work_phone: newData.workPhone,
    });
  };

  return (
    <FormProvider {...methods}>
      <View>
        <View style={styles.form}>
          <InputInfo
            descriptionStyle={styles.description}
            labelStyle={styles.label}
            label="ФИО"
            description={user?.full_name || ""}
            style={styles.inputInfoContainer}
          />
          <InputInfo
            descriptionStyle={styles.description}
            labelStyle={styles.label}
            label="Должность"
            description={user?.position.name || ""}
            style={styles.inputInfoContainer}
          />
          <InputInfo
            descriptionStyle={styles.description}
            labelStyle={styles.label}
            label="Управленческое подразделение"
            description={user?.division.management.name || ""}
            style={styles.inputInfoContainer}
          />
          <AccordionItem
            style={{ gap: 12 }}
            viewKey="profileAccordion"
            isExpanded={open}
          >
            <InputInfo
              descriptionStyle={styles.description}
              labelStyle={styles.label}
              label="Коробка"
              description={user?.division.management.department.name || ""}
              style={styles.inputInfoContainer}
            />
            <InputInfo
              descriptionStyle={styles.description}
              labelStyle={styles.label}
              label="Юридическое лицо"
              description={user?.division.organization.name || ""}
              style={styles.inputInfoContainer}
            />
            <InputInfo
              descriptionStyle={styles.description}
              labelStyle={styles.label}
              label="E-mail"
              description={user?.email || ""}
              style={styles.inputInfoContainer}
            />
            <PhoneInput
              labelStyles={styles.label}
              name="homePhone"
              containerStyle={styles.inputInfoContainer}
              labelText="Личный номер телефона"
            />
            <PhoneInput
              labelStyles={styles.label}
              name="workPhone"
              containerStyle={styles.inputInfoContainer}
              labelText="Рабочий номер телефона"
            />
            <ControlledInput
              labelText="Внутренний номер"
              name="internalPhone"
              inputStyle={styles.inputs}
              maxLength={4}
              keyboardType="numeric"
              labelStyle={styles.label}
              style={[styles.inputInfoContainer, styles.inputBorderColor]}
            />
            <ControlledInput
              labelText="Мой Telegram"
              name="telegram"
              placeholder="Вводите без знака @"
              inputStyle={styles.inputs}
              labelStyle={styles.label}
              style={[styles.inputInfoContainer, styles.inputBorderColor]}
            />
            <GradientButton
              isLoading={isPending}
              onPress={handleSubmit(onSubmit)}
              disabled={!isDirty}
              style={{ paddingBottom: 12 }}
            >
              <Text>Сохранить изменения</Text>
            </GradientButton>
          </AccordionItem>
        </View>
        <Pressable
          style={{
            alignSelf: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={onPress}
        >
          {!openAccordion ? (
            <>
              <ChevronDown color={Colors.gray50} />
              <Text style={{ color: Colors.gray50 }}> загрузить больше </Text>
              <ChevronDown color={Colors.gray50} />
            </>
          ) : (
            <>
              <ChevronUp color={Colors.gray50} />
              <Text style={{ color: Colors.gray50 }}> скрыть </Text>
              <ChevronUp color={Colors.gray50} />
            </>
          )}
        </Pressable>
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 12,
  },
  inputs: {
    fontFamily: Fonts.SFSemiBold,
    color: Colors.black,
  },
  inputBorderColor: {
    borderColor: Colors.gray30,
  },
  inputInfoContainer: {
    borderRadius: 25,
  },
  description: {
    fontFamily: Fonts.SFSemiBold,
    fontSize: 14,
    color: Colors.black,
  },
  label: {
    color: Colors.gray70,
    fontFamily: Fonts.TRegular,
    fontSize: 13,
  },
});
