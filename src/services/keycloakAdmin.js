import { createApi } from '@reduxjs/toolkit/query/react';
import qs from 'query-string';

import { keycloakInstance } from '../axios';

import { EXCLUDED_CACHE_KEYS, getCacheKey } from './helpers';

export const keycloakBaseQuery =
  ({ baseUrl = '/' } = {}) =>
  async ({ url = '', method = 'GET', data = {}, query = {} } = {}) => {
    try {
      const search = qs.stringify(query);
      const result = await keycloakInstance({
        method,
        data,
        url: qs.exclude(`${baseUrl}${url}${search ? `?${search}` : ''}`, EXCLUDED_CACHE_KEYS),
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
    getUsersByRole: builder.query({
      query: ({ roleName } = {}) => ({ url: `roles/${roleName}/users` }),
    }),
  }),
  serializeQueryArgs: getCacheKey,
});

export const { useGetUsersQuery, useGetUsersByRoleQuery } = keycloakAdminApi;
