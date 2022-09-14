import { appApi } from './app';

export const decarbonizationApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getDecarbonization: builder.query({
      query: (query) => ({
        query,
        url: `decarbon`,
      }),

      transformResponse: (res) => {
        console.log(res);
        const newData = res?.data?.map((data) => {
          const { item, main, detail, actuals, targets } = data;
          const newElement = { item, main, detail };
          targets.forEach((item, index) => {
            newElement[item.year + '12'] = targets[index];
          });
          actuals.forEach((item, index) => {
            newElement[item.year + '11'] = actuals[0];
          });
          return newElement;
        });

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
