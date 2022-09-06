import APP_CONSTANTS from '../app/appConstants';

import { appApi } from './app';

export const decarbonizationApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getDecarbonization: builder.query({
      query: (query, business = APP_CONSTANTS.BUSINESS_MAPPING.ALL, year = APP_CONSTANTS.CURRENT_YEAR, month = APP_CONSTANTS.CURRENT_MONTH) => ({
        query,
        url: `decarbon?business=${business}&site=ALL&plant=ALL&is_ytm=ALL&year=${year}&month=${month}`,
      }),
    
      transformResponse: (res) => {
        console.log(res.data[0])
        return {
          ...res,
          data: res.data.sort((a, b) => b.main.localeCompare(a.main)).sort((a, b) => b.item.localeCompare(a.item)),
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetDecarbonizationQuery } = decarbonizationApi;
