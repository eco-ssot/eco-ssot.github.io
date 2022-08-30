import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getVersionItem: builder.query({
      query: () => ({ url: '/version.json' }),
    }),
    getPlantChangelog: builder.query({
      query: () => ({ url: '/plant-changelog.json' }),
    }),
    getEnv: builder.query({
      query: () => ({ url: '/env.json' }),
    }),
    getAnnounces: builder.query({
      query: () => ({ url: '/announces.json' }),
    }),
  }),
});

// 
export const { useGetVersionItemQuery, useGetPlantChangelogQuery, useGetEnvQuery, useGetAnnouncesQuery } = publicApi;
