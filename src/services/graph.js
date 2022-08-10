import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { msalInstance } from '../ad';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_GRAPH_API_URL,
  prepareHeaders: (headers, api) => {
    const token = localStorage.getItem('graph-access-token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    let { accessToken } = await msalInstance.acquireTokenSilent({ scopes: ['https://graph.microsoft.com/.default'] });
    if (accessToken) {
      localStorage.setItem('graph-access-token', accessToken);
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const graphApi = createApi({
  reducerPath: 'graphApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (q) => ({ url: `/users?$filter=startswith(mail, '${q}') or startswith(displayName, '${q}')` }),
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery } = graphApi;
