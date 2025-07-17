import AsyncStorage from "@react-native-async-storage/async-storage";
import { createEffect, createEvent, createStore, sample } from "effector";
import { IUserCredentials } from "../types/types";

interface ITokens {
  refreshToken: string;
  accessToken: string;
  infoToken: string;
}

export const setUserCredentials = createEvent<IUserCredentials>();
export const setTokens = createEvent<ITokens>();
export const removeUserCredentials = createEvent();
export const setIsAuthenticated = createEvent<boolean>();

const fetchUserCredentialsFx = createEffect(async () => {
  const login = await AsyncStorage.getItem("login");
  const fullName = await AsyncStorage.getItem("fullName");
  const kanUid = await AsyncStorage.getItem("kanUid");
  const employeeGuid = await AsyncStorage.getItem("employeeGuid");
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  const accessToken = await AsyncStorage.getItem("accessToken");
  const infoToken = await AsyncStorage.getItem("infoToken");

  return {
    login: login || "",
    refreshToken: refreshToken || "",
    accessToken: accessToken || "",
    infoToken: infoToken || "",
    fullName: fullName || "",
    kanUid: kanUid || "",
    employeeGuid: employeeGuid || "",
    isAuthenticated: Boolean(kanUid),
  };
});

const updateUserCredentialsFx = createEffect(async (user: IUserCredentials) => {
  await AsyncStorage.multiSet([
    ["login", user.login],
    ["refreshToken", user.refreshToken],
    ["accessToken", user.accessToken],
    ["infoToken", user.infoToken],
    ["fullName", user.fullName],
    ["kanUid", String(user.kanUid)],
    ["employeeGuid", user.employeeGuid],
  ]);
});

const removeUserCredentialsFx = createEffect(async () => {
  await AsyncStorage.multiRemove([
    "login",
    "refreshToken",
    "accessToken",
    "infoToken",
    "fullName",
    "kanUid",
    "employeeGuid",
  ]);
});

const initialState = {
  login: "",
  refreshToken: "",
  accessToken: "",
  infoToken: "",
  isAuthenticated: false,
  fullName: "",
  kanUid: "",
  employeeGuid: "",
};

export const $auth = createStore<IUserCredentials>(initialState);

$auth
  .on(setUserCredentials, (state, user) => user)
  .on(setTokens, (state, { accessToken, refreshToken, infoToken }) => ({
    ...state,
    accessToken,
    refreshToken,
    infoToken,
  }))
  .on(setIsAuthenticated, (state, isAuthenticated) => ({
    ...state,
    isAuthenticated,
  }))
  .reset(removeUserCredentials);

sample({
  clock: fetchUserCredentialsFx.doneData,
  target: setUserCredentials,
});

sample({
  clock: $auth,
  target: updateUserCredentialsFx,
});

sample({
  clock: removeUserCredentials,
  target: removeUserCredentialsFx,
});

fetchUserCredentialsFx();
