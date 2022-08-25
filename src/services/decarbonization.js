import { appApi } from './app';

export const decarbonizationApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getDecarbonization: builder.query({
      query: (query) => ({ query, url: 'decarbonization' }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetDecarbonizationQuery } = decarbonizationApi;
