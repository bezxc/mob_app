import { createEvent, createStore } from "effector";

export const toggleModalPicker = createEvent<string>();

const initialState = {
  modalVisible: false,
  modalName: "",
};

export const $modalVisible = createStore(initialState).on(
  toggleModalPicker,
  (state, payload) => ({
    modalName: payload,
    modalVisible: !state.modalVisible,
  }),
);
