import { partition } from 'lodash';

import { getMaxDate } from '../utils/date';

import { appApi } from './app';
import { getPlantData } from './helpers';

export function toRow({ plants = [], ...data } = {}) {
  const {
    site,
    ASPCompareYear,
    ASPCurrentYear,
    ASPGradient,
    ASPWeight,
    electricCompareYear,
    electricCurrentYear,
    electricGradient,
    electricWeight,
    revenueCompareYear,
    revenueCurrentYear,
    revenueGradient,
    revenueWeight,
    waterUseCompareYear,
    waterUseCurrentYear,
    waterUseGradient,
    waterUseWeight,
  } = data;
  return {
    site,
    electricity: {
      currYear: electricCurrentYear,
      lastYear: electricCompareYear,
      weight: electricWeight,
      delta: electricGradient,
    },
    water: {
      currYear: waterUseCurrentYear,
      lastYear: waterUseCompareYear,
      weight: waterUseWeight,
      delta: waterUseGradient,
    },
    revenue: {
      currYear: revenueCurrentYear,
      lastYear: revenueCompareYear,
      weight: revenueWeight,
      delta: revenueGradient,
    },
    asp: {
      currYear: ASPCurrentYear,
      lastYear: ASPCompareYear,
      weight: ASPWeight,
      delta: ASPGradient,
    },
    subRows: plants.map(toRow),
    ...(site === 'Total' && { isFooter: true }),
  };
}

export const overviewApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      providesTags: ['SHIPMENT_UPLOAD'],
      query: (query) => ({ query, url: 'overall' }),
      transformResponse: (res, { permission }) => {
        const data = getPlantData(res.data, permission);
        const [total, records] = partition(data, ({ site }) => site === 'Total');
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
    getOverviewHistory: builder.query({
      query: (query) => ({ query, url: 'overall/history' }),
      transformResponse: (res, { permission }) => {
        const data = getPlantData(res.data, permission);
        const [total, records] = partition(data, ({ site }) => site === 'Total');
        return { data: [...records, ...total].map(toRow) };
      },
    }),
    uploadShipmentExcel: builder.mutation({
      query: (formData) => ({
        url: 'shipment/upload',
        method: 'POST',
        data: formData,
      }),
      invalidatesTags: ['SHIPMENT_UPLOAD'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetOverviewQuery, useGetOverviewHistoryQuery, useUploadShipmentExcelMutation } = overviewApi;
