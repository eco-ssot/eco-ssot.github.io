import { createSlice, createSelector } from '@reduxjs/toolkit';
import { subMonths } from 'date-fns';

import { selectM, selectY } from '../renderless/location/locationSlice';

import APP_CONSTANTS from './appConstants';

const initialState = {
  missingPlants: [],
  dateInfo: {
    latestDate: String(new Date()),
    yearOptions: APP_CONSTANTS.YEAR_OPTIONS,
    currYear: APP_CONSTANTS.CURRENT_YEAR,
    lastYear: APP_CONSTANTS.LAST_YEAR,
    currMonth: String(subMonths(new Date(), 1).getMonth() + 1),
    yOptions: APP_CONSTANTS.YEAR_OPTIONS,
  },
  loadingPage: {},
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDateInfo: (state, action) => {
      state.dateInfo = { ...state.dateInfo, ...action.payload };
    },
    setMissingPlants: (state, action) => {
      state.missingPlants = action.payload;
    },
    setLoadingPage: (state, action) => {
      state.loadingPage = {
        ...state.loadingPage,
        ...action.payload,
      };
    },
  },
});

export const { setDateInfo, setMissingPlants, setLoadingPage } = appSlice.actions;
export const selectReducer = (state) => state.app;
export const selectYearOptions = createSelector(selectReducer, (state) => state.dateInfo.yearOptions);
export const selectCurrYear = createSelector(selectReducer, (state) => state.dateInfo.currYear);
export const selectLastYear = createSelector(selectReducer, (state) => state.dateInfo.lastYear);
export const selectCurrY = createSelector(selectReducer, selectY, (state, y) => y || state.dateInfo.currYear);
export const selectLastY = createSelector(selectReducer, selectY, (state, y) =>
  y ? String(Number(y) - 1) : state.dateInfo.lastYear
);

export const selectCurrMonth = createSelector(selectReducer, (state) => state.dateInfo.currMonth);
export const selectCurrM = createSelector(selectReducer, selectM, (state, m) => m || state.dateInfo.currMonth);
export const selectMissingPlants = createSelector(selectReducer, (state) => state.missingPlants);
export const selectLatestDate = createSelector(selectReducer, (state) => state.dateInfo.latestDate);
export const selectYoptions = createSelector(selectReducer, (state) => state.dateInfo.yOptions);
export const selectLatestYear = createSelector(
  selectReducer,
  (state) => state.dateInfo.latestYear || state.dateInfo.currYear
);

export const selectLatestMonth = createSelector(
  selectReducer,
  (state) => state.dateInfo.latestMonth || state.dateInfo.currMonth
);

export const selectIsLoading = (state) => {
  const { queries, mutations } = state.appApi;
  return Object.values({ ...queries, ...mutations })
    .filter(
      (api) =>
        !api.endpointName.endsWith('Async') &&
        !(
          api.originalArgs?.PREFETCH === true ||
          (api.originalArgs?.PREFETCH !== undefined && api.originalArgs.PREFETCH === window.location.pathname)
        )
    )
    .some((api) => api.status === 'pending');
};

export const selectIsLoadingPage = createSelector(selectReducer, (state) =>
  Object.entries(state.loadingPage).some(([key, value]) => value === true && !key.startsWith('.'))
);

export default appSlice.reducer;
