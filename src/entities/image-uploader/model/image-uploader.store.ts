import AsyncStorage from "@react-native-async-storage/async-storage";
import { createEffect, createEvent, createStore, sample } from "effector";

// Создаем события
export const init = createEvent();
export const reset = createEvent();
export const saveAvatarToStorage = createEvent<string>();
// События для управления состоянием модального окна

// Эффект для получения аватара из AsyncStorage
const fetchAvatarFromAsyncStorageFx = createEffect(async () => {
  return (await AsyncStorage.getItem("avatar")) ?? "";
});

// Эффект для обновления аватара в AsyncStorage
const updateAvatarInAsyncStorageFx = createEffect(async (state: string) => {
  try {
    await AsyncStorage.setItem("avatar", `${state}`);
  } catch (error) {
    console.error(error);
  }
});

// Эффект для удаления аватара из AsyncStorage
const deleteAvatarFromAsyncStorageFx = createEffect(async () => {
  try {
    await AsyncStorage.removeItem("avatar");
  } catch (error) {
    console.error(error);
  }
});

export const $avatar = createStore("")
  .on(init, (_, value) => value)
  .on(saveAvatarToStorage, (_, uploadedAvatar) => {
    return uploadedAvatar;
  })
  .reset(reset);

sample({
  clock: fetchAvatarFromAsyncStorageFx.doneData,
  target: init,
});

sample({
  clock: $avatar,
  target: updateAvatarInAsyncStorageFx,
});

// Удаляем аватар из AsyncStorage при сбросе состояния
sample({
  clock: reset,
  target: deleteAvatarFromAsyncStorageFx,
});

// Запускаем эффект для получения аватара из AsyncStorage
fetchAvatarFromAsyncStorageFx();
