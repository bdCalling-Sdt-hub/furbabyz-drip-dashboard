import { baseApi } from '../../base/baseApi';

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query({
            query: () => ({
                url: '/user/get-all-user',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetUserQuery } = userApi;
