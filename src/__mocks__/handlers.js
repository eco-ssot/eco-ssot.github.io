import { rest } from 'msw';

const globs = import.meta.glob('./**/*.json');
const mocks = {};

for (const path in globs) {
  globs[path]().then((mod) => {
    mocks[path.replace('index.json', '').replace('.json', '')] = mod.default;
  });
}

async function baseHandler(req, res, ctx) {
  const method = req.method.toLowerCase();
  const pathname = req.url.pathname.split('/api/')[1];
  const nextPathname = pathname.slice(-1) === '/' ? pathname : `${pathname}/`;
  req.url.searchParams.sort();
  const search = req.url.searchParams.toString();
  await new Promise((resolve) => setTimeout(resolve, import.meta.env.VITE_MOCK_API_RESPONSE_DELAY));
  if (mocks[`./${method}/${nextPathname}${search}`]) {
    return res(ctx.json(mocks[`./${method}/${nextPathname}${search}`]));
  }

  if (mocks[`./${method}/${nextPathname}`]) {
    return res(ctx.json(mocks[`./${method}/${nextPathname}`]));
  }

  return res(ctx.status(404));
}

export const handlers = [rest.get(/api/, baseHandler), rest.post(/api/, baseHandler)];
