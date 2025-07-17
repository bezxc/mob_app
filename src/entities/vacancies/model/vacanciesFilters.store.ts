import { createEvent, createStore } from "effector";

interface IAppliedFilter {
  position_guid__in?: string;
  management_guid__in?: string;
  department_guid__in?: string;
  avg_wage_from__gte?: number;
  avg_wage_to__lte?: number;
}

export interface IVacanciesFiltersInitialState {
  position?: { guid: string; positionName: string } | null;
  department?: { department_guid: string; department_name: string } | null;
  management?: { management_guid: string; management_name: string } | null;
  applyFilter: IAppliedFilter | null;
  avg_wage_from__gte?: number;
  avg_wage_to__lte?: number;
}

export const setVacanciesFilters =
  createEvent<Partial<IVacanciesFiltersInitialState>>();
export const setAppliedFilter = createEvent();
export const clearFilters = createEvent();

const initialState = {
  position: null,
  department: null,
  management: null,
  applyFilter: null,
  avg_wage_from__gte: 0,
  avg_wage_to__lte: 0,
};

export const $vacanciesFilter =
  createStore<IVacanciesFiltersInitialState>(initialState);

$vacanciesFilter
  .on(setVacanciesFilters, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .on(setAppliedFilter, (state) => {
    const preparedFilters: Partial<IAppliedFilter>[] = [];

    if (state.position) {
      preparedFilters.push({
        position_guid__in: state.position.guid,
      });
    }

    if (state.department) {
      preparedFilters.push({
        department_guid__in: state.department.department_guid,
      });
    }

    if (state.management) {
      preparedFilters.push({
        management_guid__in: state.management.management_guid,
      });
    }

    if (state.avg_wage_from__gte) {
      preparedFilters.push({
        avg_wage_from__gte: state.avg_wage_from__gte,
      });
    }
    if (state.avg_wage_to__lte) {
      preparedFilters.push({
        avg_wage_to__lte: state.avg_wage_to__lte,
      });
    }

    const applyFilter = preparedFilters.reduce<IAppliedFilter>(
      (acc, curr) => ({ ...acc, ...curr }),
      {}
    );
    return {
      ...state,
      applyFilter,
    };
  })
  .on(clearFilters, () => initialState);
