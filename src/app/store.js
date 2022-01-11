import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import errorHandlerReducer from '../renderless/error-handler/errorHandlerSlice';
import loaderReducer from '../renderless/loader/loaderSlice';
import locationReducer from '../renderless/location/locationSlice';
import { appApi } from '../services/app';
import { carbonApi } from '../services/carbon';
import { electricityApi } from '../services/electricity';
import { keycloakAdminApi } from '../services/keycloakAdmin';
import { managementApi } from '../services/management';
import { overviewApi } from '../services/overview';
import { renewableEnergyApi } from '../services/renewableEnergy';
import { summaryApi } from '../services/summary';
import { unitElectricityApi } from '../services/unitElectricity';
import { wasteApi } from '../services/waste';
import { waterApi } from '../services/water';
import { weatherApi } from '../services/weather';

import appReducer from './appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
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
    [keycloakAdminApi.reducerPath]: keycloakAdminApi.reducer,
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
    keycloakAdminApi.middleware,
  ],
});

setupListeners(store.dispatch);
