import { createApi } from '@reduxjs/toolkit/query/react';
import { partition } from 'lodash';

import { getMaxDate } from '../utils/date';

import { axiosBaseQuery } from './helpers';

export function toRow({
  name,
  area,
  percent,
  solarElectric,
  structure,
  tRec,
  target,
  totalElectric,
  plants = [],
} = {}) {
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

export const renewableEnergyApi = createApi({
  reducerPath: 'renewableEnergyApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getRenewableEnergy: builder.query({
      query: (query) => ({ query, url: 'renewableenergy' }),
      transformResponse: (res) => {
        const [total, records] = partition(res.data, ({ name }) => name === 'Total');
        const maxDate = getMaxDate(
          ...res.data.reduce(
            (prev, { latestDate, plants = [] }) => prev.concat(latestDate).concat(plants.map((p) => p.latestDate)),
            []
          )
        );

        return { maxDate, data: [...records, ...total].map(toRow) };
      },
    }),
    getRenewableEnergyHistory: builder.query({
      query: (query) => ({ query, url: 'renewableenergy/history' }),
      transformResponse: (res) => {
        const [total, records] = partition(res.data, ({ name }) => name === 'Total');
        return { data: [...records, ...total] };
      },
    }),
  }),
});

export const { useGetRenewableEnergyQuery, useGetRenewableEnergyHistoryQuery } = renewableEnergyApi;
