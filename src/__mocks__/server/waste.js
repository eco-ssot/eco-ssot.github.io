import { rest } from 'msw';

import wasteJson from '../get/waste';
import analysisJson from '../get/waste/anaysis';
import explanationJson from '../get/waste/anaysis/explanation';
import wasteHistoryJson from '../get/waste/history';

const waste = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/waste`, (req, res, ctx) => {
    return res(ctx.json(wasteJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/waste/history`, (req, res, ctx) => {
    return res(ctx.json(wasteHistoryJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/waste/anaysis`, (req, res, ctx) => {
    return res(ctx.json(analysisJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/waste/anaysis/explanation`, (req, res, ctx) => {
    return res(ctx.json(explanationJson));
  }),
];

export { waste };
