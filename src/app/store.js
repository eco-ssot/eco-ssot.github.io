import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { weatherApi } from '../services/weather';
import { carbonApi } from '../services/carbon';
import { renewableEnergyApi } from '../services/renewableEnergy';
import { electricityApi } from '../services/electricity';
import { unitElectricityApi } from '../services/unitElectricity';
import { wasteApi } from '../services/waste';
import { waterApi } from '../services/water';
import { summaryApi } from '../services/summary';
import { managementApi } from '../services/management';
import queryParamsReducer from '../renderless/query-params/queryParamsSlice';
import loaderReducer from '../renderless/loader/loaderSlice';
import errorHandlerReducer from '../renderless/error-handler/errorHandlerSlice';

export const store = configureStore({
  reducer: {
    queryParams: queryParamsReducer,
    loader: loaderReducer,
    errorHandler: errorHandlerReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [carbonApi.reducerPath]: carbonApi.reducer,
    [renewableEnergyApi.reducerPath]: renewableEnergyApi.reducer,
    [electricityApi.reducerPath]: electricityApi.reducer,
    [unitElectricityApi.reducerPath]: unitElectricityApi.reducer,
    [wasteApi.reducerPath]: wasteApi.reducer,
    [waterApi.reducerPath]: waterApi.reducer,
    [summaryApi.reducerPath]: summaryApi.reducer,
    [managementApi.reducerPath]: managementApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    weatherApi.middleware,
    carbonApi.middleware,
    renewableEnergyApi.middleware,
    electricityApi.middleware,
    unitElectricityApi.middleware,
    wasteApi.middleware,
    waterApi.middleware,
    summaryApi.middleware,
    managementApi.middleware,
  ],
});

setupListeners(store.dispatch);
