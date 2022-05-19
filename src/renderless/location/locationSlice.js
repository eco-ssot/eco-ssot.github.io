import { createSlice, createSelector } from '@reduxjs/toolkit';
import qs from 'query-string';

const hash = window.location.hash;
const search = window.location.search;
const initialState = {
  hash,
  search,
  query: { ...qs.parse(search) },
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setQueryParams: (state, action) => {
      state.search = action.payload;
      state.query = { ...qs.parse(action.payload) };
    },
    setHash: (state, action) => {
      state.hash = action.payload;
    },
  },
});

export const { setQueryParams, setHash } = locationSlice.actions;
export const selectReducer = (state) => state.location;
export const selectQuery = createSelector(selectReducer, (state) => state.query);
export const selectSearch = createSelector(selectReducer, (state) => state.search);
export const selectHash = createSelector(selectReducer, (state) => state.hash);
export const selectBusiness = createSelector(selectQuery, (state) => state.business);
export const selectLanguage = createSelector(selectQuery, (state) => state.lng || localStorage.getItem('i18nextLng'));
export const selectYear = createSelector(selectQuery, (state) => state.year);
export const selectCy = createSelector(selectQuery, (state) => state.cy);
export const selectDimension = createSelector(selectQuery, (state) => state.dimension);
export const selectSite = createSelector(selectQuery, (state) => state.site);
export const selectPlant = createSelector(selectQuery, (state) => state.plant);
export const selectStartYear = createSelector(selectQuery, (state) => state.startYear);
export const selectEndYear = createSelector(selectQuery, (state) => state.endYear);
export const selectMonthType = createSelector(selectQuery, (state) => state.monthType);
export const selectStartMonth = createSelector(selectQuery, (state) => state.startMonth);
export const selectEndMonth = createSelector(selectQuery, (state) => state.endMonth);
export const selectCategorized = createSelector(selectQuery, (state) => state.categorized);
export const selectMonth = createSelector(selectQuery, (state) => state.month);
export const selectY = createSelector(selectQuery, (state) => state.y);
export const selectM = createSelector(selectQuery, (state) => state.m);
export const selectS = createSelector(selectQuery, (state) => state.s);
export const selectP = createSelector(selectQuery, (state) => state.p);
export const selectPt = createSelector(selectQuery, (state) => state.pt);

export default locationSlice.reducer;
