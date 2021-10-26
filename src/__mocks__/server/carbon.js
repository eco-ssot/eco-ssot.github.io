import { rest } from 'msw';

import carbonJson from '../get/carbon';
import carbonHistoryJson from '../get/carbon/history';
import carbonHistorySameYearJson from '../get/carbon/history/sameYear.json';
import carbonHistorySingleJson from '../get/carbon/history/single.json';
import { getHistoryData } from '../helpers';

const carbon = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/carbon`, (req, res, ctx) => {
    return res(ctx.json(carbonJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/carbon/history`, (req, res, ctx) => {
    return res(ctx.json(getHistoryData('carbon', req)));
  }),
];

export { carbon };
