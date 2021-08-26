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
export const selectYear = createSelector(selectQuery, (state) => state.year);
export const selectDimension = createSelector(selectQuery, (state) => state.dimension);

export default locationSlice.reducer;
