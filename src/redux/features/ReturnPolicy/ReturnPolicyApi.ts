import { baseApi } from '../../api/baseApi';

const returnPolicyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPolicy: builder.query({
            query: () => ({
                url: `/setting/get-return-policy`,
                method: 'GET',
            }),
            providesTags: ['ReturnPolicy'],
        }),
        addPolicy: builder.mutation({
            query: (data) => ({
                url: `/setting/create-return-policy`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['ReturnPolicy'],
        }),
    }),
});

export const { useAddPolicyMutation, useGetAllPolicyQuery } = returnPolicyApi;
