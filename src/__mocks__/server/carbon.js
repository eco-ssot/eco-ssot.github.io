import { rest } from 'msw';

import carbonJson from '../get/carbon';
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
