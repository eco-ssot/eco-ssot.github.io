import APP_CONSTANTS from '../app/appConstants';

import { appApi } from './app';

export const decarbonizationApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getDecarbonization: builder.query({
      query: (
        query,
        business = APP_CONSTANTS.BUSINESS_MAPPING.ALL,
        year = APP_CONSTANTS.CURRENT_YEAR,
        month = APP_CONSTANTS.CURRENT_MONTH
      ) => ({
        query,
        url: `decarbonization`,
        // url: `decarbon?business=${business}&site=ALL&plant=ALL&is_ytm=ALL&year=${year}&month=${month}`,
      }),

      transformResponse: (res) => {
        const newData =  res?.data?.map((data) => {
          const { item, main, detail, actuals, targets } = data;
          const newElement = { item, main, detail, actuals };
          targets.forEach((item, index) => {
            newElement[item.year+"12"] = targets[index];
          });
          return newElement;
        })
        console.log(newData);
        return {
          ...res,
          data: newData.sort((a, b) => b.main.localeCompare(a.main)).sort((a, b) => b.item.localeCompare(a.item)),
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetDecarbonizationQuery } = decarbonizationApi;
