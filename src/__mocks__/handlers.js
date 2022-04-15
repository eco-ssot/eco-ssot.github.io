import { rest } from 'msw';

export const handlers = [
  rest.get(/api/, async (req, res, ctx) => {
    const method = req.method.toLocaleLowerCase();
    const pathname = req.url.pathname.split('/api/')[1];
    req.url.searchParams.sort();
    const search = req.url.searchParams.toString();
    await new Promise((resolve) => setTimeout(resolve, process.env.REACT_APP_MOCK_API_RESPONSE_DELAY));
    return import(`./${method}/${pathname}/${search}`)
      .then((data) => res(ctx.json(data.default)))
      .catch(() => import(`./${method}/${pathname}`).then((data) => res(ctx.json(data.default))))
      .catch(() => res(ctx.status(404)));
  }),
];
