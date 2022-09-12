import { partition } from 'lodash';

import { getMaxDate } from '../utils/date';

import { appApi } from './app';
import { getPlantData } from './helpers';

export function toRow({ plants = [], ...data } = {}) {
  const {
    name,
    co2Coefficient,
    co2CurrentYear,
    co2Electric,
    co2Gradient,
    co2baseYear,
    scope1,
    scope2,
    solarElectric,
    tRec,
    totalElectric,
    target,
  } = data;
  return {
    target,
    site: name,
    carbonIndex: co2Coefficient,
    electricity: {
      tRec,
      total: totalElectric,
      sun: solarElectric,
      carbon: co2Electric,
    },
    carbon: {
      scope1,
      scope2,
      currYear: co2CurrentYear,
      baseYear: co2baseYear,
      delta: co2Gradient,
    },
    subRows: plants.map(toRow),
    ...(name === 'Total' && { isFooter: true }),
  };
}

export const carbonApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getCarbon: builder.query({
      query: (query) => ({ query, url: 'carbon' }),
      transformResponse: (res, { permission }) => {
        const data = getPlantData(res.data, permission, 'name');
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
    getCarbonHistory: builder.query({
      query: (query) => ({ query, url: 'carbon/history' }),
      transformResponse: (res, { permission }) => {
        const data = getPlantData(res.data, permission, 'name');
        const [total, records] = partition(data, ({ name }) => name === 'Total');
        return { data: [...records, ...total] };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetCarbonQuery, useGetCarbonHistoryQuery } = carbonApi;
