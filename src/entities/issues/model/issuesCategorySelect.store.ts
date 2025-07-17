import { createEvent, createStore } from "effector";
import { IssuesItemCategory } from "./issuesApiSchema";

export const setSelectedCategory = createEvent<{
  selectedCategory: IssuesItemCategory;
}>();

export const resetSelectedCategory = createEvent();

const filtersInitialState = {
  selectedCategory: null,
};

export const $issuesCategorySelect = createStore<{
  selectedCategory: IssuesItemCategory | null;
}>(filtersInitialState);

$issuesCategorySelect
  .on(setSelectedCategory, (state, currentState) => ({
    ...state,
    selectedCategory: currentState.selectedCategory,
  }))

  .reset(resetSelectedCategory);
