import { createApi } from '@reduxjs/toolkit/query/react';

import APP_CONSTANTS from '../app/appConstants';
import { getMaxDate } from '../utils/date';

import { axiosBaseQuery } from './helpers';

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
  ],
  endpoints: (builder) => ({
    getMissingPlants: builder.query({
      queryFn: (query) => {
        return axiosBaseQuery()({ query, url: 'summary' }).then((res) => {
          return {
            data: query.year && query.year < 2022 ? [] : res.data.missing,
          };
        });
      },
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
});

export const { useGetMissingPlantsQuery, useGetLatestDateQuery } = appApi;
