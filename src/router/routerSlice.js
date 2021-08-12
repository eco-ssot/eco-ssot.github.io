import qs from 'query-string';

import { createSlice, createSelector } from '@reduxjs/toolkit';

const search = window.location.href.split('?')[1];
const initialState = {
  search,
  query: { ...qs.parse(search) },
};

export const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    setQueryParams: (state, action) => {
      state.search = action.payload;
      state.query = { ...qs.parse(action.payload) };
    },
  },
});

export const { setQueryParams } = routerSlice.actions;
export const selectRouter = (state) => state.router;
export const selectQueryParams = createSelector(selectRouter, (router) => router.query);
export const selectSearch = createSelector(selectRouter, (router) => router.search);
export const selectBusiness = createSelector(selectQueryParams, (query) => query.business);
export const selectCompareYear = createSelector(selectQueryParams, (query) => query.compareYear);

export default routerSlice.reducer;
