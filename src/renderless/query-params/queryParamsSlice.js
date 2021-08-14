import { createSlice, createSelector } from '@reduxjs/toolkit';
import qs from 'query-string';

const search = window.location.href.split('?')[1];
const initialState = {
  search,
  query: { ...qs.parse(search) },
};

export const queryParamsSlice = createSlice({
  name: 'queryParams',
  initialState,
  reducers: {
    setQueryParams: (state, action) => {
      state.search = action.payload;
      state.query = { ...qs.parse(action.payload) };
    },
  },
});

export const { setQueryParams } = queryParamsSlice.actions;
export const selectReducer = (state) => state.queryParams;
export const selectQuery = createSelector(selectReducer, (state) => state.query);
export const selectSearch = createSelector(selectReducer, (state) => state.search);
export const selectBusiness = createSelector(selectQuery, (state) => state.business);
export const selectCompareYear = createSelector(selectQuery, (state) => state.compareYear);

export default queryParamsSlice.reducer;
