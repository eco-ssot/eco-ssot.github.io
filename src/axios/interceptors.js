import env from '../environments/environment';

const { mock } = env;

export function mockInterceptor(config) {
  if (mock) {
    return {
      ...config,
      adapter: ({ method, url, mockPath }) =>
        new Promise(async (resolve) => {
          const [filename, search] = url.split('?');
          let json = { default: {} };
          try {
            json = await import(`../__mocks__/${method}${mockPath || filename}/${search || ''}`);
          } catch (err) {
          } finally {
            setTimeout(() => {
              const response = {
                config,
                data: json.default,
                status: 200,
                headers: {
                  'content-type': 'application/json',
                },
              };

              resolve(response);
            }, 1000);
          }
        }),
    };
  }

  return config;
}
