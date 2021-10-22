import { rest } from 'msw';

import objectiveJson from '../get/settings/2021/ALL/objective';
import carbonIndexJson from '../get/settings/2021/carbonCoef';

const app = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/settings/2021/ALL/objective`, (req, res, ctx) => {
    return res(ctx.json(objectiveJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/settings/2021/carbonCoef`, (req, res, ctx) => {
    return res(ctx.json(carbonIndexJson));
  }),
];

export { app };
