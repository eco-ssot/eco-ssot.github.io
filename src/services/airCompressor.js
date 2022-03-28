import { appApi } from './app';

export const airCompressorApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoi: builder.query({
      query: (query) => ({ query, url: 'air-compress/rec' }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetRoiQuery } = airCompressorApi;
