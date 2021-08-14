import env from '../environments/environment';

const { mock } = env;

export function mockInterceptor(config) {
  if (mock) {
    return {
      ...config,
      adapter: (adapterConfig) =>
        new Promise((resolve) => {
          const { method, url, mockPath } = adapterConfig;
          const filename = url.split('?')[0];
          import(`../__mocks__/${method}${mockPath || filename}`)
            .then((json) =>
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
              }, 1000)
            )
            .catch(console.error);
        }),
    };
  }

  return config;
}
