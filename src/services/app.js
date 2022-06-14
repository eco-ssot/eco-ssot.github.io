import { createApi } from '@reduxjs/toolkit/query/react';
import { format } from 'date-fns';

import APP_CONSTANTS from '../app/appConstants';
import { getMaxDate } from '../utils/date';

import { axiosBaseQuery, EXCLUDED_CACHE_KEYS } from './helpers';

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    'YEAR_GOAL',
    'CARBON_INDEX',
    'TREC',
    'TREC_BY_SITE',
    'ELECTRICITY_EXPLANATION',
    'POWER_SAVING',
    'WASTE_EXPLANATION',
    'WASTE_UPLOAD',
    'WATER_EXPLANATION',
    'CSR',
    'SHIPMENT_UPLOAD',
    'ENERGY_UPLOAD',
    'AIR_COMPRESSOR_SPEC',
  ],
  endpoints: (builder) => ({
    getMissingPlants: builder.query({
      providesTags: ['SHIPMENT_UPLOAD', 'WASTE_UPLOAD'],
      queryFn: (query) => {
        return axiosBaseQuery()({ query, url: 'summary' }).then((res) => {
          if (process.env.REACT_APP_NO_MISSING_PLANTS) {
            const latestDate = getMaxDate(
              res?.data?.revenue?.latestDate,
              res?.data?.electricPowerUtilization?.latestDate,
              res?.data?.CO2Emission?.latestDate,
              res?.data?.waterUse?.latestDate,
              res?.data?.waste?.latestDate
            );

            const ld = format(new Date(latestDate), 'yyyy-MM-01');
            if (process.env.REACT_APP_NO_MISSING_PLANTS.split(',').includes(ld)) {
              return { data: [] };
            }
          }

          return {
            data: query.year && query.year < 2022 ? [] : res.data?.missing || [],
          };
        });
      },
    }),
    getPlants: builder.query({
      query: (query) => ({ query, url: 'plants' }),
      transformResponse: (res) => res.data?.sort((a, b) => a.localeCompare(b)),
    }),
    getLatestDate: builder.query({
      query: (query) => ({ query, url: 'summary' }),
      transformResponse: (res) => {
        const latestDate = getMaxDate(
          res?.revenue?.latestDate,
          res?.electricPowerUtilization?.latestDate,
          res?.CO2Emission?.latestDate,
          res?.waterUse?.latestDate,
          res?.waste?.latestDate
        );

        const ld = new Date(latestDate);
        const currYear = ld.getFullYear();
        const lastYear = currYear - 1;
        const currMonth = ld.getMonth() + 1;
        const yearOptions = APP_CONSTANTS.YEAR_OPTIONS.filter((option) => Number(option.key) <= currYear);
        return {
          latestDate,
          yearOptions,
          currYear: String(currYear),
          lastYear: String(lastYear),
          currMonth: String(currMonth),
        };
      },
    }),
  }),
  serializeQueryArgs: ({ queryArgs, endpointName }) => {
    const cacheKey = JSON.stringify(
      queryArgs,
      typeof queryArgs === 'object' && queryArgs !== null
        ? Object.keys(queryArgs)
            .filter((key) => !EXCLUDED_CACHE_KEYS.includes(key))
            .sort()
        : null
    );

    return `${endpointName}(${cacheKey})`;
  },
});

export const { useGetMissingPlantsQuery, useGetLatestDateQuery, useGetPlantsQuery } = appApi;
