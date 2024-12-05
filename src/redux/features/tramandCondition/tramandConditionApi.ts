import { baseApi } from '../../api/baseApi';

const termAndConditionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTerms: builder.query({
            query: () => ({
                url: `/setting/get-terms`,
                method: 'GET',
            }),
            providesTags: ['TermAndCondition'],
        }),
        addTerms: builder.mutation({
            query: (data) => ({
                url: `/setting/create-terms`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['TermAndCondition'],
        }),
    }),
});

export const { useGetAllTermsQuery, useAddTermsMutation } = termAndConditionApi;
