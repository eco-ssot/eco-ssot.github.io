export function mockInterceptor(config) {
  if (Number(process.env.REACT_APP_MOCK)) {
    return {
      ...config,
      adapter: ({ method, url, mockPath }) =>
        new Promise(async (resolve) => {
          const [filename, search] = url.split('?');
          let json = { default: {} };
          try {
            json = await import(`../__mocks__/${method}${mockPath || filename}/${search || ''}`);
          } catch (err) {
            console.error(err);
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

export function loggerInterceptor(response) {
  const {
    status,
    config: { url, method },
  } = response;

  console.info(`[${method.toUpperCase()}] ${url} ${status}`);
  return response;
}

export function tokenInterceptor(config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}
