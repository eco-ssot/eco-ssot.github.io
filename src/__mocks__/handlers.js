import { rest } from 'msw';

const globs = import.meta.glob('./**/*.json');

async function getMock({ method, pathname, search }) {
  if (search) {
    const path = `./${method}/${pathname}${search}.json`;
    if (globs[path]) {
      return (await globs[path]()).default;
    }
  }

  const nextPathname = pathname.slice(-1) === '/' ? pathname : `${pathname}/`;
  const path = `./${method}/${nextPathname}index.json`;
  if (globs[path]) {
    return (await globs[path]()).default;
  }
}

async function baseHandler(req, res, ctx) {
  const method = req.method.toLowerCase();
  const pathname = req.url.pathname.split('/api/')[1];
  req.url.searchParams.sort();
  const search = req.url.searchParams.toString();
  await new Promise((resolve) => setTimeout(resolve, import.meta.env.VITE_MOCK_API_RESPONSE_DELAY));
  const data = await getMock({ method, pathname, search });
  if (data) {
    return res(ctx.json(data));
  }

  return res(ctx.status(404));
}

export const handlers = [rest.get(/api/, baseHandler), rest.post(/api/, baseHandler)];
