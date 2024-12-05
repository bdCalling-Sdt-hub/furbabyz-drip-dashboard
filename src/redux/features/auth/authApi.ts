import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                body: userInfo,
            }),
        }),
        getProfile: builder.query({
            query: () => ({
                url: '/user/profile',
                method: 'GET',
            }),
        }),

        updateProfile: builder.mutation({
            query: (userInfo) => ({
                url: '/user/update-profile',
                method: 'PATCH',
                body: userInfo,
            }),
            // invalidatesTags: ['User'],
        }),

        changePass: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: userInfo,
            }),
        }),
    }),
});

export const { useLoginMutation, useGetProfileQuery, useUpdateProfileMutation, useChangePassMutation } = authApi;
