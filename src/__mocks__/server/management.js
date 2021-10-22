import { rest } from 'msw';

import dataStatusJson from '../get/data-status';
import picJson from '../get/data-status/pic';

const management = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/data-status`, (req, res, ctx) => {
    return res(ctx.json(dataStatusJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/data-status/pic`, (req, res, ctx) => {
    return res(ctx.json(picJson));
  }),
];

export { management };
