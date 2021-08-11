import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5/' }),
  endpoints: (builder) => ({
    getWeatherById: builder.query({
      query: ({ id = '1668338' } = {}) =>
        `weather?id=${id}&appid=12e58ba7c668780614ff867c4d0d91c3&units=metric`,
    }),
  }),
});

export const { useGetWeatherByIdQuery } = weatherApi;
