import { rest } from 'msw';

import unitElectricityJson from '../get/singleelectricity';
import { getHistoryData } from '../helpers';

const unitElectricity = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/singleelectric`, (req, res, ctx) => {
    return res(ctx.json(unitElectricityJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/singleelectric/history`, (req, res, ctx) => {
    return res(ctx.json(getHistoryData('singleelectricity', req)));
  }),
];

export { unitElectricity };
