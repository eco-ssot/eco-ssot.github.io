import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  authenticated: localStorage.token,
};

export const keyCloakSlice = createSlice({
  name: 'keycloak',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
  },
});

export const { setAuthenticated } = keyCloakSlice.actions;
export const selectReducer = (state) => state.keycloak;
export const selectAuthenticated = createSelector(selectReducer, (state) => state.authenticated);

export default keyCloakSlice.reducer;
