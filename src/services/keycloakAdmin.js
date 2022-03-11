import { createApi } from '@reduxjs/toolkit/query/react';
import qs from 'query-string';

import { keycloakInstance } from '../axios';

export const keycloakBaseQuery =
  ({ baseUrl = '/' } = {}) =>
  async ({ url = '', method = 'GET', data = {}, query = {} } = {}) => {
    try {
      const search = qs.stringify(query);
      const result = await keycloakInstance({
        method,
        data,
        url: `${baseUrl}${url}${search ? `?${search}` : ''}`,
      });

      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const keycloakAdminApi = createApi({
  reducerPath: 'keycloakAdminApi',
  baseQuery: keycloakBaseQuery(),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (query) => ({ query: { max: 10, ...query }, url: 'users' }),
    }),
  }),
});

export const { useGetUsersQuery } = keycloakAdminApi;
