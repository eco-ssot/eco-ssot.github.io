import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { weatherApi } from '../services/weather';
import { summaryApi } from '../services/summary';
import { managementApi } from '../services/management';
import { overviewApi } from '../services/overview';
import queryParamsReducer from '../renderless/query-params/queryParamsSlice';
import loaderReducer from '../renderless/loader/loaderSlice';
import errorHandlerReducer from '../renderless/error-handler/errorHandlerSlice';

export const store = configureStore({
  reducer: {
    queryParams: queryParamsReducer,
    loader: loaderReducer,
    errorHandler: errorHandlerReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [summaryApi.reducerPath]: summaryApi.reducer,
    [managementApi.reducerPath]: managementApi.reducer,
    [overviewApi.reducerPath]: overviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    weatherApi.middleware,
    summaryApi.middleware,
    managementApi.middleware,
    overviewApi.middleware,
  ],
});

setupListeners(store.dispatch);
