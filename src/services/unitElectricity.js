import { createApi } from '@reduxjs/toolkit/query/react';
import { partition } from 'lodash';

import { axiosBaseQuery } from './helpers';
import { getMaxDate } from '../utils/date';

export function toRow({
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
  plants = [],
} = {}) {
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

export const unitElectricityApi = createApi({
  reducerPath: 'unitElectricityApi',
  baseQuery: axiosBaseQuery(),
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

        return { maxDate, data: [...records, ...total].map(toRow) };
      },
    }),
  }),
});

export const { useGetUnitElectricityQuery } = unitElectricityApi;
