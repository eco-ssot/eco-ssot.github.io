import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { msalInstance } from '../ad';
import { setUserProfile } from '../app/appSlice';

const SELECT_ENTITIES = `$select=businessPhones,department,displayName,mail,givenName,surname,mailNickname,id,officeLocation,userPrincipalName`;

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_GRAPH_API_URL,
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
      query: (q) => ({
        url: `/users?$filter=startswith(mail, '${q}') or startswith(displayName, '${q}')&${SELECT_ENTITIES}`,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: `/me?${SELECT_ENTITIES}`,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // `onStart` side-effect
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          dispatch(setUserProfile(data));
        } catch (err) {
          // `onError` side-effect
        }
      },
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery, useGetProfileQuery } = graphApi;
