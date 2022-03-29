import { appApi } from './app';

export const airCompressorApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getAirCompressList: builder.query({
      query: (query) => ({ query, url: 'air-compress/list' }),
    }),
    getRoi: builder.query({
      query: (query) => ({ query, url: 'air-compress/rec' }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAirCompressListQuery, useGetRoiQuery } = airCompressorApi;
