import APP_CONSTANTS from '../app/appConstants';
import { setDateInfo } from '../app/appSlice';
import { getMaxDate } from '../utils/date';

import { appApi } from './app';
import { axiosBaseQuery } from './helpers';

export const summaryApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getSummary: builder.query({
      providesTags: ['YEAR_GOAL', 'CARBON_INDEX'],
      queryFn: (query, { dispatch, getState }) => {
        return axiosBaseQuery()({ query, url: 'summary' }).then((res) => {
          const latestDate = getMaxDate(
            res.data?.revenue?.latestDate,
            res.data?.electricPowerUtilization?.latestDate,
            res.data?.CO2Emission?.latestDate,
            res.data?.waterUse?.latestDate,
            res.data?.waste?.latestDate
          );

          const ld = new Date(latestDate);
          const currYear = ld.getFullYear();
          const lastYear = currYear - 1;
          const currMonth = ld.getMonth() + 1;
          const yearOptions = APP_CONSTANTS.YEAR_OPTIONS.filter((option) => Number(option.key) <= currYear);
          dispatch(
            setDateInfo({
              latestDate,
              yearOptions,
              currYear: String(currYear),
              lastYear: String(lastYear),
              currMonth: String(currMonth),
              ...(!query && {
                yOptions: yearOptions,
                latestMonth: String(currMonth),
                latestYear: String(currYear),
              }),
            })
          );

          return {
            data: {
              ...res.data,
              latestDate,
              yearOptions,
              currYear: String(currYear),
              lastYear: String(lastYear),
              currMonth: String(currMonth),
            },
          };
        });
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetSummaryQuery } = summaryApi;
