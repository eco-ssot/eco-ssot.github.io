import { appApi } from './app';

export const authApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserList: builder.query({
      providesTags: ['USERS'],
      query: (query) => ({ query, url: 'permission' }),
      transformResponse: (res) => {
        const ret = Object.entries(res || {}).reduce((prev, [key, values]) => {
          values.forEach((value) => {
            prev[value.id] = { ...value, roles: (prev[value.id]?.roles || []).concat(key) };
          });

          return prev;
        }, {});

        return {
          ...res,
          data: Object.values(ret),
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // `onStart` side-effect
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          localStorage.setItem('user-list', JSON.stringify(data.data || []));
        } catch (err) {
          // `onError` side-effect
        }
      },
    }),
    postUser: builder.mutation({
      invalidatesTags: ['USERS'],
      query: (data) => ({
        data,
        url: 'permission',
        method: 'POST',
      }),
    }),
    deleteUser: builder.mutation({
      invalidatesTags: ['USERS'],
      query: (id) => ({
        url: `permission/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserListQuery } = authApi;
