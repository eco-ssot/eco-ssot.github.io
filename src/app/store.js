import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { weatherApi } from '../services/weather';
import { summaryApi } from '../services/summary';
import { managementApi } from '../services/management';
import { overviewApi } from '../services/overview';
import { carbonApi } from '../services/carbon';
import { renewableEnergyApi } from '../services/renewableEnergy';
import { electricityApi } from '../services/electricity';
import { waterApi } from '../services/water';
import { unitElectricityApi } from '../services/unitElectricity';
import locationReducer from '../renderless/location/locationSlice';
import loaderReducer from '../renderless/loader/loaderSlice';
import errorHandlerReducer from '../renderless/error-handler/errorHandlerSlice';

export const store = configureStore({
  reducer: {
    location: locationReducer,
    loader: loaderReducer,
    errorHandler: errorHandlerReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [summaryApi.reducerPath]: summaryApi.reducer,
    [managementApi.reducerPath]: managementApi.reducer,
    [overviewApi.reducerPath]: overviewApi.reducer,
    [carbonApi.reducerPath]: carbonApi.reducer,
    [renewableEnergyApi.reducerPath]: renewableEnergyApi.reducer,
    [electricityApi.reducerPath]: electricityApi.reducer,
    [waterApi.reducerPath]: waterApi.reducer,
    [unitElectricityApi.reducerPath]: unitElectricityApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    weatherApi.middleware,
    summaryApi.middleware,
    managementApi.middleware,
    overviewApi.middleware,
    carbonApi.middleware,
    renewableEnergyApi.middleware,
    electricityApi.middleware,
    waterApi.middleware,
    unitElectricityApi.middleware,
  ],
});

setupListeners(store.dispatch);
