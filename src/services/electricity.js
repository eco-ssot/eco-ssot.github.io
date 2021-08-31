import { createApi } from '@reduxjs/toolkit/query/react';
import { partition } from 'lodash';

import { axiosBaseQuery } from './helpers';
import { getMaxDate } from '../utils/date';

export function toRow({
  name,
  electricCompareYear,
  electricCurrentYear,
  electricGradient,
  revenueCompareYear,
  revenueCurrentYear,
  revenueGradient,
  billiRevenueElectricCompareYear,
  billiRevenueElectricCurrentYear,
  billiRevenueElectricGradient,
  ASPCompareYear,
  ASPCurrentYear,
  ASPGradientYear,
  plants = [],
} = {}) {
  return {
    site: name,
    electricity: {
      currYear: electricCurrentYear,
      lastYear: electricCompareYear,
      delta: electricGradient,
    },
    revenue: {
      currYear: revenueCurrentYear,
      lastYear: revenueCompareYear,
      delta: revenueGradient,
    },
    revenueElectricity: {
      currYear: billiRevenueElectricCurrentYear,
      lastYear: billiRevenueElectricCompareYear,
      delta: billiRevenueElectricGradient,
    },
    asp: {
      currYear: ASPCurrentYear,
      lastYear: ASPCompareYear,
      delta: ASPGradientYear,
    },
    subRows: plants.map(toRow),
    ...(name === 'Total' && { isFooter: true }),
  };
}

export const electricityApi = createApi({
  reducerPath: 'electricityApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getElectricity: builder.query({
      query: (query) => ({ query, url: 'electric' }),
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

export const { useGetElectricityQuery } = electricityApi;
