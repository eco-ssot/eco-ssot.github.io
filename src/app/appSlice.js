import { createSlice, createSelector } from '@reduxjs/toolkit';
import { subMonths } from 'date-fns';

import APP_CONFIG from '../constants/app-config';
import { selectM, selectY } from '../renderless/location/locationSlice';

const initialState = {
  missingPlants: [],
  dateInfo: {
    latestDate: String(new Date()),
    yearOptions: APP_CONFIG.YEAR_OPTIONS,
    currYear: APP_CONFIG.CURRENT_YEAR,
    lastYear: APP_CONFIG.LAST_YEAR,
    currMonth: String(subMonths(new Date(), 1).getMonth() + 1),
    yOptions: APP_CONFIG.YEAR_OPTIONS,
  },
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
  },
});

export const { setDateInfo, setMissingPlants } = appSlice.actions;
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

export default appSlice.reducer;
