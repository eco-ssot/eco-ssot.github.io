export default function mockInterceptor(config) {
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
