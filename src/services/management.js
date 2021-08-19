import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../axios/helpers';

export const managementApi = createApi({
  reducerPath: 'managementApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getGoal: builder.query({
      query: ({ year }) => ({ url: `settings/${year}/objective` }),
    }),
  }),
});

export const { useGetGoalQuery } = managementApi;
