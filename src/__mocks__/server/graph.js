import { rest } from 'msw';

import graphJson from '../get/graph';

const graph = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/graph`, (req, res, ctx) => {
    return res(ctx.json(graphJson));
  }),
];

export { graph };
