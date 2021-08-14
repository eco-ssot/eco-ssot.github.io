import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  loadingCount: 0,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    increment: (state) => {
      state.loadingCount = state.loadingCount + 1;
    },
    decrement: (state) => {
      state.loadingCount = state.loadingCount - 1 < 0 ? 0 : state.loadingCount - 1;
    },
  },
});

export const { increment, decrement } = loaderSlice.actions;
export const selectReducer = (state) => state.loader;
export const selectLoadingCount = createSelector(selectReducer, (state) => state.loadingCount);
export const selectIsLoading = createSelector(selectLoadingCount, (state) => state > 0);

export default loaderSlice.reducer;
