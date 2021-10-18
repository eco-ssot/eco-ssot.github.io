import { rest } from 'msw';

import wasteJson from '../get/waste';

const waste = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/waste`, (req, res, ctx) => {
    return res(ctx.json(wasteJson));
  }),
];

export { waste };
