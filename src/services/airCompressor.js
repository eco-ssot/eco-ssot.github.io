import { nanoid } from 'nanoid';

import { appApi } from './app';

export const airCompressorApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getAirCompressList: builder.query({
      query: (query) => ({ query, url: 'air-compress/list' }),
    }),
    getRoi: builder.query({
      query: (query) => ({ query, url: 'air-compress/rec' }),
    }),
    getSpec: builder.query({
      providesTags: ['AIR_COMPRESSOR_SPEC'],
      query: (query) => ({ query, url: 'air-compress/specs' }),
      transformResponse: (res) => {
        return {
          ...res,
          data: res.data?.map((d, i) => ({ ...d, order: i })),
        };
      },
    }),
    getMaintenanceList: builder.query({
      query: (query) => ({ query, url: 'air-compress/maintain/list' }),
    }),
    getMaintenance: builder.query({
      query: (query) => ({ query, url: 'air-compress/maintain/rec' }),
      transformResponse: (res) => {
        return {
          ...res,
          data: {
            ...res.data,
            info: res.data?.info?.map((d) => ({ ...d, id: nanoid() })),
          },
        };
      },
    }),
    postSpec: builder.mutation({
      invalidatesTags: ['AIR_COMPRESSOR_SPEC'],
      query: (data) => ({
        data,
        url: 'air-compress/specs',
        method: 'POST',
      }),
    }),
    patchSpec: builder.mutation({
      invalidatesTags: ['AIR_COMPRESSOR_SPEC'],
      query: ({ id, ...data }) => ({
        data,
        url: `air-compress/specs/${id}`,
        method: 'PATCH',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAirCompressListQuery,
  useGetRoiQuery,
  useGetSpecQuery,
  useGetMaintenanceListQuery,
  useGetMaintenanceQuery,
  usePostSpecMutation,
  usePatchSpecMutation,
} = airCompressorApi;
