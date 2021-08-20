import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { weatherApi } from '../services/weather';
import { summaryApi } from '../services/summary';
import { managementApi } from '../services/management';
import queryParamsReducer from '../renderless/query-params/queryParamsSlice';
import loaderReducer from '../renderless/loader/loaderSlice';
import errorHandlerReducer from '../renderless/error-handler/errorHandlerSlice';
import keycloakReducer from '../keycloak/keycloakSlice';

export const store = configureStore({
  reducer: {
    queryParams: queryParamsReducer,
    loader: loaderReducer,
    errorHandler: errorHandlerReducer,
    keycloak: keycloakReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [summaryApi.reducerPath]: summaryApi.reducer,
    [managementApi.reducerPath]: managementApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    weatherApi.middleware,
    summaryApi.middleware,
    managementApi.middleware,
  ],
});

setupListeners(store.dispatch);
