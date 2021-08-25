export default function loggerInterceptor(response) {
  const {
    status,
    config: { url, method },
  } = response;

  console.log(`[${method.toUpperCase()}] ${url} ${status}`);
  return response;
}
