import { createEvent, createStore } from "effector";

interface IDefaultItem {
  name: string;
  guid: string;
}

type AppliedFilter = [
  "organization_guid" | "management_guid" | "position_guid" | "department_guid",
  string,
];

export interface IColleaguesFiltersInitialState {
  organization: IDefaultItem | null;
  position: IDefaultItem | null;
  management: IDefaultItem | null;
  department: IDefaultItem | null;
  applyFilter: AppliedFilter[] | null;
}

export const setColleaguesFilters =
  createEvent<Partial<IColleaguesFiltersInitialState>>();
export const setAppliedFilter = createEvent();
export const clearFilters = createEvent();

const initialState = {
  organization: null,
  position: null,
  management: null,
  department: null,
  applyFilter: null,
};

export const $colleaguesFilters =
  createStore<IColleaguesFiltersInitialState>(initialState);

$colleaguesFilters
  .on(setColleaguesFilters, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .on(setAppliedFilter, (state) => {
    const vocabulary = [
      ["organization_guid", state.organization?.guid],
      ["management_guid", state.management?.guid],
      ["position_guid", state.position?.guid],
      ["department_guid", state.department?.guid],
    ];

    const preparedVocabulary = vocabulary.filter((item) =>
      Boolean(item[1]),
    ) as AppliedFilter[];

    return {
      ...state,
      applyFilter: preparedVocabulary.length > 0 ? preparedVocabulary : null,
    };
  })
  .on(clearFilters, () => initialState);
