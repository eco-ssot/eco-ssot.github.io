import { rest } from 'msw';

import carbonJson from '../get/carbon';

const carbon = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/carbon`, (req, res, ctx) => {
    return res(ctx.json(carbonJson));
  }),
];

export { carbon };
