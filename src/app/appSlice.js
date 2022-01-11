import { createSlice, createSelector } from '@reduxjs/toolkit';
import { subMonths } from 'date-fns';

import APP_CONFIG from '../constants/app-config';

const initialState = {
  missingPlants: [],
  dateInfo: {
    latestDate: String(new Date()),
    yearOptions: APP_CONFIG.YEAR_OPTIONS,
    currYear: APP_CONFIG.CURRENT_YEAR,
    lastYear: APP_CONFIG.LAST_YEAR,
    currMonth: String(subMonths(new Date(), 1).getMonth() + 1),
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
export const selectCurrMonth = createSelector(selectReducer, (state) => state.dateInfo.currMonth);
export const selectMissingPlants = createSelector(selectReducer, (state) => state.missingPlants);
export const selectLatestDate = createSelector(selectReducer, (state) => state.dateInfo.latestDate);

export default appSlice.reducer;
