import { appApi } from './app';

export const decarbonizationApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getDecarbonization: builder.query({
      query: (
        query,
      ) => ({
        query,
        url: `decarbon`,
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
