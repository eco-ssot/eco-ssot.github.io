import { rest } from 'msw';

import renewableEnergyJson from '../get/renewableenergy';

const renewableEnergy = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/renewableenergy`, (req, res, ctx) => {
    return res(ctx.json(renewableEnergyJson));
  }),
];

export { renewableEnergy };
