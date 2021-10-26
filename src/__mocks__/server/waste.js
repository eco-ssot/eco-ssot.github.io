import { rest } from 'msw';

import wasteJson from '../get/waste';
import analysisJson from '../get/waste/anaysis';
import explanationJson from '../get/waste/anaysis/explanation';
import { getHistoryData } from '../helpers';

const waste = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/waste`, (req, res, ctx) => {
    return res(ctx.json(wasteJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/waste/history`, (req, res, ctx) => {
    return res(ctx.json(getHistoryData('waste', req)));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/waste/anaysis`, (req, res, ctx) => {
    return res(ctx.json(analysisJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/waste/anaysis/explanation`, (req, res, ctx) => {
    return res(ctx.json(explanationJson));
  }),
  rest.patch(`${process.env.REACT_APP_API_BASE_URL}/waste/anaysis/explanation/:id`, (req, res, ctx) => {
    return res(ctx.json({ id: 1 }));
  }),
  rest.post(`${process.env.REACT_APP_API_BASE_URL}/waste/anaysis/explanation`, (req, res, ctx) => {
    return res(ctx.json({ id: 1 }));
  }),
];

export { waste };
