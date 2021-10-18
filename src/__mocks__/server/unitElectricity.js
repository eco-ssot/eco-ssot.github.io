import { rest } from 'msw';

import unitElectricityJson from '../get/singleelectricity';

const unitElectricity = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/singleelectric`, (req, res, ctx) => {
    return res(ctx.json(unitElectricityJson));
  }),
];

export { unitElectricity };
