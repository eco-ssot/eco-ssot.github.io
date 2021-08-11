import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { pokemonApi } from '../services/pokemon';
import { weatherApi } from '../services/weather';
import { overallApi } from '../services/overall';
import { co2Api } from '../services/co2';
import { renewableEnergyApi } from '../services/renewableenergy';
import { electricApi } from '../services/electric';
import { singleElectricApi } from '../services/singleelectric';
import { wasteApi } from '../services/waste';
import { waterApi } from '../services/water';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [overallApi.reducerPath]: overallApi.reducer,
    [co2Api.reducerPath]: co2Api.reducer,
    [renewableEnergyApi.reducerPath]: renewableEnergyApi.reducer,
    [electricApi.reducerPath]: electricApi.reducer,
    [singleElectricApi.reducerPath]: singleElectricApi.reducer,
    [wasteApi.reducerPath]: wasteApi.reducer,
    [waterApi.reducerPath]: waterApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    pokemonApi.middleware,
    weatherApi.middleware,
    overallApi.middleware,
    co2Api.middleware,
    renewableEnergyApi.middleware,
    electricApi.middleware,
    singleElectricApi.middleware,
    wasteApi.middleware,
    waterApi.middleware,
  ],
});

setupListeners(store.dispatch);
