import { groupBy } from 'lodash';

import { appApi } from './app';

const ITEM_ORDER = ['總電量', '節能降耗', '節能耗電', '可再生能源佔比', '可再生能源', '碳排放'];
const MAIN_ORDER = ['2022 年耗電', '該年耗電', '2022 年', '當年度', '噸 CO2e', '2016 年'];
const DETAIL_ORDER = [
  '每年增長 5%',
  '累計節電量 MWH',
  '累計節電量',
  '佔 2022 年',
  '佔比',
  '自建太陽能',
  '直購綠電',
  '綠能投資',
  '購買綠證',
  'Total 佔比',
  'Scope 1',
  'Scope 2',
  '碳抵消',
  '減碳模擬',
  'SBTi 目標',
];

const isEqual = (b) => (a) => a?.replace(/ /g, '')?.toLowerCase() === b?.replace(/ /g, '')?.toLowerCase();
const getNextIndex = (index) => (index === -1 ? 9999 : index);
const toFixedOrder = (a, b) => {
  const aItemIndex = ITEM_ORDER.findIndex(isEqual(a.item));
  const bItemIndex = ITEM_ORDER.findIndex(isEqual(b.item));
  const aMainIndex = MAIN_ORDER.findIndex(isEqual(a.main));
  const bMainIndex = MAIN_ORDER.findIndex(isEqual(b.main));
  const aDetailIndex = DETAIL_ORDER.findIndex(isEqual(a.detail));
  const bDetailIndex = DETAIL_ORDER.findIndex(isEqual(b.detail));
  return (
    getNextIndex(aItemIndex) - getNextIndex(bItemIndex) ||
    getNextIndex(aMainIndex) - getNextIndex(bMainIndex) ||
    getNextIndex(aDetailIndex) - getNextIndex(bDetailIndex)
  );
};

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
        const sortedData = res.data?.slice()?.sort(toFixedOrder);
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
