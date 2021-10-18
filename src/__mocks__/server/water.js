import { rest } from 'msw';

import waterJson from '../get/water';

const water = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/water`, (req, res, ctx) => {
    return res(ctx.json(waterJson));
  }),
];

export { water };
