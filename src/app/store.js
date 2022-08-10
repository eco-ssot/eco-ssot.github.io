import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import errorHandlerReducer from '../renderless/error-handler/errorHandlerSlice';
import loaderReducer from '../renderless/loader/loaderSlice';
import locationReducer from '../renderless/location/locationSlice';
import { appApi } from '../services/app';
import { publicApi } from '../services/public';

import appReducer from './appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    location: locationReducer,
    loader: loaderReducer,
    errorHandler: errorHandlerReducer,
    [appApi.reducerPath]: appApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), appApi.middleware, publicApi.middleware],
});

setupListeners(store.dispatch);
