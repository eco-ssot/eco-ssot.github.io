import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { appApi } from '../services/app';
import { weatherApi } from '../services/weather';
import { summaryApi } from '../services/summary';
import { managementApi } from '../services/management';
import { overviewApi } from '../services/overview';
import { carbonApi } from '../services/carbon';
import { renewableEnergyApi } from '../services/renewableEnergy';
import { electricityApi } from '../services/electricity';
import { waterApi } from '../services/water';
import { unitElectricityApi } from '../services/unitElectricity';
import { wasteApi } from '../services/waste';
import locationReducer from '../renderless/location/locationSlice';
import loaderReducer from '../renderless/loader/loaderSlice';
import errorHandlerReducer from '../renderless/error-handler/errorHandlerSlice';

export const store = configureStore({
  reducer: {
    location: locationReducer,
    loader: loaderReducer,
    errorHandler: errorHandlerReducer,
    [appApi.reducerPath]: appApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [summaryApi.reducerPath]: summaryApi.reducer,
    [managementApi.reducerPath]: managementApi.reducer,
    [overviewApi.reducerPath]: overviewApi.reducer,
    [carbonApi.reducerPath]: carbonApi.reducer,
    [renewableEnergyApi.reducerPath]: renewableEnergyApi.reducer,
    [electricityApi.reducerPath]: electricityApi.reducer,
    [waterApi.reducerPath]: waterApi.reducer,
    [unitElectricityApi.reducerPath]: unitElectricityApi.reducer,
    [wasteApi.reducerPath]: wasteApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    appApi.middleware,
    weatherApi.middleware,
    summaryApi.middleware,
    managementApi.middleware,
    overviewApi.middleware,
    carbonApi.middleware,
    renewableEnergyApi.middleware,
    electricityApi.middleware,
    waterApi.middleware,
    unitElectricityApi.middleware,
    wasteApi.middleware,
  ],
});

setupListeners(store.dispatch);
