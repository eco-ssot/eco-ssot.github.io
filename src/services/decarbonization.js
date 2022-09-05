import APP_CONSTANTS from '../app/appConstants';

import { appApi } from './app';

export const decarbonizationApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getDecarbonization: builder.query({
      query: (query, year = APP_CONSTANTS.CURRENT_YEAR, business = APP_CONSTANTS.BUSINESS_MAPPING.ALL) => ({
        query,
        url: `decarbon?business=${business}&site=ALL&plant=ALL&is_ytm=ALL&year=${year}&month=09`,
      }),
      transformResponse: (res) => {
        console.log(res.data)
        return {
          ...res,
          data: res.data.sort((a, b) => b.item.localeCompare(a.item)),
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetDecarbonizationQuery } = decarbonizationApi;
