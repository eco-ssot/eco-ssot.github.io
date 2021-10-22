import { rest } from 'msw';

import summaryJson from '../get/summary';

const summary = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/summary`, (req, res, ctx) => {
    console.log(req.url);
    return res(ctx.json(summaryJson));
  }),
];

export { summary };
