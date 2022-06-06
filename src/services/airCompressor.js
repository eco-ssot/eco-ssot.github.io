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
  usePostSpecMutation,
  usePatchSpecMutation,
} = airCompressorApi;
