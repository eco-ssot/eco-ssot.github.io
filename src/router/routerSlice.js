import { createSlice, createSelector } from '@reduxjs/toolkit';

import { toQuery } from './helpers';

const initialState = {
  search: window.location.search,
  query: toQuery(window.location.search),
};

export const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    setQueryParams: (state, action) => {
      state.search = action.payload;
      state.query = toQuery(action.payload);
    },
  },
});

export const { setQueryParams } = routerSlice.actions;
export const selectRouter = (state) => state.router;
export const selectQueryParams = createSelector(selectRouter, (router) => router.query);
export const selectSearch = createSelector(selectRouter, (router) => router.search);
export const selectBusiness = createSelector(selectQueryParams, (query) => query.business);

export default routerSlice.reducer;
