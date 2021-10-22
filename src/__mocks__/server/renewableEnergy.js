import { rest } from 'msw';

import renewableEnergyJson from '../get/renewableenergy';
import renewableEnergyHistoryJson from '../get/renewableenergy/history';

const renewableEnergy = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/renewableenergy`, (req, res, ctx) => {
    return res(ctx.json(renewableEnergyJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/renewableenergy/history`, (req, res, ctx) => {
    return res(ctx.json(renewableEnergyHistoryJson));
  }),
];

export { renewableEnergy };
