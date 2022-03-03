import { partition } from 'lodash';

import { getMaxDate } from '../utils/date';

import { appApi } from './app';

export function toRow({ plants = [], ...data } = {}) {
  const {
    name,
    electricCompareYear,
    electricCurrentYear,
    electricGradient,
    productionCompareYear,
    productionCurrentYear,
    productionGradient,
    singleElectricCompareYear,
    singleElectricCurrentYear,
    singleElectricGradient,
  } = data;
  return {
    site: name,
    electricity: {
      currYear: electricCurrentYear,
      lastYear: electricCompareYear,
      delta: electricGradient,
    },
    production: {
      currYear: productionCurrentYear,
      lastYear: productionCompareYear,
      delta: productionGradient,
    },
    unitElectricity: {
      currYear: singleElectricCurrentYear,
      lastYear: singleElectricCompareYear,
      delta: singleElectricGradient,
    },
    subRows: plants.map(toRow),
    ...(name === 'Total' && { isFooter: true }),
  };
}

export const unitElectricityApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getUnitElectricity: builder.query({
      query: (query) => ({ query, url: 'singleelectric' }),
      transformResponse: (res) => {
        const [total, records] = partition(res.data, ({ name }) => name === 'Total');
        const maxDate = getMaxDate(
          ...res.data.reduce(
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
    getUnitElectricityHistory: builder.query({
      query: (query) => ({ query, url: 'singleelectric/history' }),
      transformResponse: (res) => {
        const [total, records] = partition(res.data, ({ name }) => name === 'Total');
        return { data: [...records, ...total] };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetUnitElectricityQuery, useGetUnitElectricityHistoryQuery } = unitElectricityApi;
