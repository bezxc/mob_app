import { createEvent, createStore } from "effector";
import { IRadioItem } from "@/shared/types/types";

type AppliedFilterKey =
  | "reg_number"
  | "publication_date__gte"
  | "publication_date__lte"
  | "was_read";

type AppliedFilter = [AppliedFilterKey, string | boolean];

export interface IEdoFiltersInitialState {
  regNumber: IRadioItem[];
  publicationDateGte: string | null;
  publicationDateLte: string | null;
  wasRead: boolean;
  applyFilter: AppliedFilter[] | null;
  options: IRadioItem[];
  filters: string[];
}

export const setEdoDocsFilters =
  createEvent<Partial<IEdoFiltersInitialState>>();
export const setAppliedFilter = createEvent();
export const clearFilters = createEvent();

const initialState: IEdoFiltersInitialState = {
  regNumber: [],
  publicationDateGte: null,
  publicationDateLte: null,
  wasRead: false,
  applyFilter: null,
  options: [],
  filters: [],
};

export const setFilters = createEvent<{ options: IRadioItem[] }>();
export const resetFilters = createEvent();

export const $edoDocsFilters =
  createStore<IEdoFiltersInitialState>(initialState);

$edoDocsFilters
  .on(setEdoDocsFilters, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .on(setAppliedFilter, (state) => {
    const vocabulary: AppliedFilter[] = [
      ["publication_date__gte", state.publicationDateGte],
      ["publication_date__lte", state.publicationDateLte],
      [
        "reg_number__in",
        state.regNumber.length > 0
          ? state.regNumber.map((option) => option.value)
          : null,
      ],
      ["was_read", state.wasRead],
    ].filter((item) => item[1] !== null) as AppliedFilter[];

    return {
      ...state,
      applyFilter: vocabulary.length > 0 ? vocabulary : null,
    };
  })
  .on(clearFilters, () => initialState);
