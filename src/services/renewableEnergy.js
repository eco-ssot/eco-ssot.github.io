import { partition } from 'lodash';

import { getMaxDate } from '../utils/date';

import { appApi } from './app';
import { getPlantData } from './helpers';

export function toRow({ plants = [], ...data } = {}) {
  const { name, area, percent, solarElectric, structure, tRec, target, totalElectric } = data;
  return {
    site: name,
    electricity: {
      tRec,
      total: totalElectric,
      sun: solarElectric,
    },
    ratio: percent,
    tRecTarget: target,
    roofRestArea: area,
    roofStructure: structure,
    subRows: plants.map(toRow),
    ...(name === 'Total' && { isFooter: true }),
  };
}

export const renewableEnergyApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getRenewableEnergy: builder.query({
      query: (query) => ({ query, url: 'renewableenergy' }),
      transformResponse: (res, { permission }) => {
        const data = getPlantData(res.data, permission?.plant, 'name');
        const [total, records] = partition(data, ({ name }) => name === 'Total');
        const maxDate = getMaxDate(
          ...data.reduce(
            (prev, { latestDate, plants = [] }) => prev.concat(latestDate).concat(plants.map((p) => p.latestDate)),
            []
          )
        );

        return {
          maxDate,
          data: [...records, ...total].map(toRow),
        };
      },
    }),
    getRenewableEnergyHistory: builder.query({
      query: (query) => ({ query, url: 'renewableenergy/history' }),
      transformResponse: (res, { permission }) => {
        const data = getPlantData(res.data, permission?.plant, 'name');
        const [total, records] = partition(data, ({ name }) => name === 'Total');
        return { data: [...records, ...total] };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetRenewableEnergyQuery, useGetRenewableEnergyHistoryQuery } = renewableEnergyApi;
