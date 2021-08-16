import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  message: '',
};

export const errorHandlerSlice = createSlice({
  name: 'errorHandler',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setError } = errorHandlerSlice.actions;
export const selectReducer = (state) => state.errorHandler;
export const selectError = createSelector(selectReducer, (state) => state.message);

export default errorHandlerSlice.reducer;
