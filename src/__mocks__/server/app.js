import { rest } from 'msw';

import pureSummaryJson from '../get/pure/summary';
import objectiveJson from '../get/settings/2021/ALL/objective';
import carbonIndexJson from '../get/settings/2021/carbonCoef';

const app = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/settings/:year/:business/objective`, (req, res, ctx) => {
    return res(ctx.json(objectiveJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/settings/:year/carbonCoef`, (req, res, ctx) => {
    return res(ctx.json(carbonIndexJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/pure/summary`, (req, res, ctx) => {
    return res(ctx.json(pureSummaryJson));
  }),
  rest.patch(`${process.env.REACT_APP_API_BASE_URL}/settings/:year/objective/:id`, (req, res, ctx) => {
    return res(ctx.json({ msg: 'success' }));
  }),
  rest.patch(`${process.env.REACT_APP_API_BASE_URL}/settings/:year/carbonCoef/:id`, (req, res, ctx) => {
    return res(ctx.json({ msg: 'success' }));
  }),
];

export { app };
