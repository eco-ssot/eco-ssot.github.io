import { rest } from 'msw';

import overallJson from '../get/overall';

const overall = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/overall`, (req, res, ctx) => {
    return res(ctx.json(overallJson));
  }),
];

export { overall };
