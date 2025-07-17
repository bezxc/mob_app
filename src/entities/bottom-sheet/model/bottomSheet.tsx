import { createEvent, createStore } from "effector";

export const toggleBottomSheet = createEvent<string>();

const initialState = {
  bottomSheetName: "",
  bottomSheetVisible: false,
};

export const $bottomSheet = createStore(initialState).on(
  toggleBottomSheet,
  (state, payload) => ({
    bottomSheetName: payload,
    bottomSheetVisible: !state.bottomSheetVisible,
  }),
);
