import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import errorHandlerReducer from '../renderless/error-handler/errorHandlerSlice';
import locationReducer from '../renderless/location/locationSlice';
import { appApi } from '../services/app';
import { graphApi } from '../services/graph';
import { publicApi } from '../services/public';

import appReducer from './appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    location: locationReducer,
    errorHandler: errorHandlerReducer,
    [appApi.reducerPath]: appApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
    [graphApi.reducerPath]: graphApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    appApi.middleware,
    publicApi.middleware,
    graphApi.middleware,
  ],
  devTools: import.meta.env.DEV,
});

setupListeners(store.dispatch);
