import { createApi } from '@reduxjs/toolkit/query/react';
import { partition } from 'lodash';

import { axiosBaseQuery } from '../axios/helpers';
import { getMaxDate } from '../utils/date';

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
    tRec,
    site: name,
    electricity: totalElectric,
    sun: solarElectric,
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
  }),
});

export const { useGetRenewableEnergyQuery } = renewableEnergyApi;
