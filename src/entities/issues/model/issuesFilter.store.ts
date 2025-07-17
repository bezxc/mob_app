import { createEvent, createStore } from "effector";
import { IRadioItem } from "@/shared/types/types";

interface IAppliedFilter {
  categoriesFilters: IRadioItem[] | null;
  statusesFilters: IRadioItem[] | null;
  dateStart: string | null;
  dateEnd: string | null;
}

export interface IIssuesFiltersInitialState {
  categoriesFilters: IRadioItem[] | null;
  statusesFilters: IRadioItem[] | null;
  dateStart: string | null;
  dateEnd: string | null;
  applyFilter: IAppliedFilter | null;
}

export const setIssuesFilters =
  createEvent<Partial<IIssuesFiltersInitialState>>();
export const setAppliedFilter = createEvent();
export const clearFilters = createEvent();
export const clearCategories = createEvent();
export const clearStatuses = createEvent();

const initialState = {
  categoriesFilters: null,
  statusesFilters: null,
  dateStart: null,
  dateEnd: null,
  applyFilter: null,
};

export const $issuesFilter =
  createStore<IIssuesFiltersInitialState>(initialState);

$issuesFilter
  .on(setIssuesFilters, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .on(setAppliedFilter, (state) => {
    const { applyFilter, ...rest } = state;
    return {
      ...state,
      applyFilter: {
        ...rest,
      },
    };
  })
  .on(clearCategories, (state) => ({ ...state, categoriesFilters: null }))
  .on(clearStatuses, (state) => ({ ...state, statusesFilters: null }))
  .on(clearFilters, () => initialState);
