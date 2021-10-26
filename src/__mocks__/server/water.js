import { rest } from 'msw';

import waterJson from '../get/water';
import analysisJson from '../get/water/anaysis';
import explanationJson from '../get/water/anaysis/explanation';
import { getHistoryData } from '../helpers';

const water = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/water`, (req, res, ctx) => {
    return res(ctx.json(waterJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/water/history`, (req, res, ctx) => {
    return res(ctx.json(getHistoryData('water', req)));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/water/anaysis`, (req, res, ctx) => {
    return res(ctx.json(analysisJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/water/anaysis/explanation`, (req, res, ctx) => {
    return res(ctx.json(explanationJson));
  }),
  rest.patch(`${process.env.REACT_APP_API_BASE_URL}/water/anaysis/explanation/:id`, (req, res, ctx) => {
    return res(ctx.json({ id: 1 }));
  }),
  rest.post(`${process.env.REACT_APP_API_BASE_URL}/water/anaysis/explanation`, (req, res, ctx) => {
    return res(ctx.json({ id: 1 }));
  }),
];

export { water };
