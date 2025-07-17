import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { setUserCredentials } from "@/shared/api/auth.store";
import { login as loginApi } from "@/shared/api/loginApi";
import { UserIcon } from "@/shared/assets/icons";
import { Colors } from "@/shared/styles/tokens";
import { IUserCredentials, JwtDecode } from "@/shared/types/types";
import { Button, ControlledInput, PasswordInput } from "@/shared/ui";
import {
  ILoginFormSchemaInitialType,
  ILoginFormSchemaType,
  LoginFormSchema,
} from "../model/LoginForm.schema";

export const LoginForm = () => {
  const methods = useForm<
    ILoginFormSchemaInitialType,
    unknown,
    ILoginFormSchemaType
  >({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const mutation = useMutation({
    mutationFn: async ({
      login,
      password,
    }: {
      login: string;
      password: string;
    }) => {
      try {
        return await loginApi({ login, password });
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      const userInfo = jwtDecode<JwtDecode>(data.info_token);

      const userCredentials: IUserCredentials = {
        login: userInfo.login_ad,
        refreshToken: data.refresh_token,
        accessToken: data.access_token,
        infoToken: data.info_token,
        isAuthenticated: true,
        kanUid: userInfo.kan_uid,
        employeeGuid: userInfo.employee_guid,
        fullName: userInfo.full_name,
      };

      setUserCredentials(userCredentials);
    },
    onError: (error) => {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Ошибка",
      });
    },
  });

  const onSubmit: SubmitHandler<ILoginFormSchemaType> = async (newData) => {
    console.log("Form Data", newData);
    mutation.mutate(newData);
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.form}>
        <ControlledInput
          style={styles.inputContainer}
          inputStyle={styles.inputStyle}
          labelStyle={styles.label}
          name="login"
          labelText="Ваш email"
          textContentType="oneTimeCode"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          placeholder="Введите корпоративную почту"
          logo={<UserIcon stroke={Colors.gray70} />}
        />
        <PasswordInput
          style={styles.inputContainer}
          labelStyle={styles.label}
          name="password"
          textContentType="oneTimeCode"
          placeholder="Введите корпоративный пароль"
          labelText="Ваш пароль"
        />
        <Button onPress={handleSubmit(onSubmit)} disabled={mutation.isPending}>
          Войти
        </Button>
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  form: {
    alignSelf: "stretch",
    gap: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.gray70,
  },
  inputStyle: {
    color: Colors.black,
    fontSize: 14,
  },
  inputContainer: {
    backgroundColor: Colors.grayLight,
  },
});
