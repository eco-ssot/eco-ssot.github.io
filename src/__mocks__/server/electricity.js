import { rest } from 'msw';

import electricityJson from '../get/electric';
import analysisJson from '../get/electric/anaysis';
import explanationJson from '../get/electric/anaysis/explanation';
import { getHistoryData } from '../helpers';

const electricity = [
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/electric`, (req, res, ctx) => {
    return res(ctx.json(electricityJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/electric/history`, (req, res, ctx) => {
    return res(ctx.json(getHistoryData('electric', req)));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/electric/anaysis`, (req, res, ctx) => {
    return res(ctx.json(analysisJson));
  }),
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/electric/anaysis/explanation`, (req, res, ctx) => {
    return res(ctx.json(explanationJson));
  }),
];

export { electricity };
