import { createEvent, createStore } from "effector";
import { IRadioItem } from "@/shared/types/types";

export const setFilters = createEvent<{ options: IRadioItem[] }>();
export const setOptionsLength = createEvent<number>();

export const resetFilters = createEvent();

const filtersInitialState = {
  options: [],
  filters: [],
  optionsLength: 0,
};

export const $postFilters = createStore<{
  options: IRadioItem[];
  filters: string[];
  optionsLength: number;
}>(filtersInitialState);

$postFilters
  .on(setFilters, (state, currentState) => ({
    ...state,
    options: currentState.options,
    filters: currentState.options.map((option) => option.value),
  }))
  .on(setOptionsLength, (state, currentState) => ({
    ...state,
    optionsLength: currentState,
  }))
  .reset(resetFilters);
