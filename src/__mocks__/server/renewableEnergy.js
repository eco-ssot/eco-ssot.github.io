import { rest } from 'msw';

import renewableEnergyJson from '../get/renewableenergy';
import renewableEnergyHistoryJson from '../get/renewableenergy/history';
import renewableEnergyHistorySameYearJson from '../get/renewableenergy/history/sameYear';
import renewableEnergyHistorySingleJson from '../get/renewableenergy/history/single';

const renewableEnergy = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/renewableenergy`, (req, res, ctx) => {
    return res(ctx.json(renewableEnergyJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/renewableenergy/history`, (req, res, ctx) => {
    const monthType = req.url.searchParams.get('monthType');
    const startYear = req.url.searchParams.get('startYear');
    const endYear = req.url.searchParams.get('endYear');
    if (monthType === 'single') {
      return res(ctx.json(renewableEnergyHistorySingleJson));
    }

    if (startYear && endYear && startYear === endYear) {
      return res(ctx.json(renewableEnergyHistorySameYearJson));
    }

    return res(ctx.json(renewableEnergyHistoryJson));
  }),
];

export { renewableEnergy };
