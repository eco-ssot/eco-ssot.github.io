import { rest } from 'msw';

import weatherJson from '../get/weather';

const weather = [
  rest.get(`https://api.openweathermap.org/data/2.5/weather`, (req, res, ctx) => {
    return res(ctx.json(weatherJson));
  }),
];

export { weather };
