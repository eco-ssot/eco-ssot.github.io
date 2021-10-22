import { rest } from 'msw';

import waterJson from '../get/water';
import analysisJson from '../get/water/anaysis';
import explanationJson from '../get/water/anaysis/explanation';
import waterHistoryJson from '../get/water/history';

const water = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/water`, (req, res, ctx) => {
    return res(ctx.json(waterJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/water/history`, (req, res, ctx) => {
    return res(ctx.json(waterHistoryJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/water/anaysis`, (req, res, ctx) => {
    return res(ctx.json(analysisJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/water/anaysis/explanation`, (req, res, ctx) => {
    return res(ctx.json(explanationJson));
  }),
];

export { water };
