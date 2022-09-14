import { groupBy, orderBy } from 'lodash';

import { appApi } from './app';

export const decarbonizationApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getDecarbonization: builder.query({
      query: (query) => ({
        query,
        url: `decarbon`,
      }),

      transformResponse: (res) => {
        const groupByItem = groupBy(res.data, (d) => d.item);
        const groupByItemMain = groupBy(res.data, (d) => [d.item, d.main].join());
        const sortedData = orderBy(res.data, ['item', 'main', 'detail'], ['desc']);
        const newData = sortedData?.reduce((prev, curr) => {
          const { item, main, detail, actuals, targets } = curr;
          const last = prev.slice(-1)[0];
          const newElement = {
            item,
            main,
            detail,
            rowSpan: {
              item: item !== last?.item ? groupByItem[item].length : 0,
              main: main !== last?.main ? groupByItemMain[[item, main].join()].length : 0,
            },
          };

          targets.forEach((item, index) => {
            newElement[item.year + '12'] = targets[index];
          });

          actuals.forEach((item, index) => {
            newElement[item.year + '11'] = actuals[index];
          });

          return prev.concat(newElement);
        }, []);

        return {
          ...res,
          data: newData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetDecarbonizationQuery } = decarbonizationApi;
