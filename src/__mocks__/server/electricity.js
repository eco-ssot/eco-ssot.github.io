import { rest } from 'msw';

import electricityJson from '../get/electric';

const electricity = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/electric`, (req, res, ctx) => {
    return res(ctx.json(electricityJson));
  }),
];

export { electricity };
