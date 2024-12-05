import { baseApi } from '../../api/baseApi';

const sizeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSize: builder.query({
            query: () => ({
                url: `/size/get-size`,
                method: 'GET',
            }),
            providesTags: ['Size'],
        }),
        addSize: builder.mutation({
            query: (data) => ({
                url: `/size/create-size`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Size'],
        }),
        getSingleSize: builder.query({
            query: (id) => ({
                url: `/size/${id}`,
                method: 'GET',
            }),
            providesTags: ['Size'],
        }),
        updateSize: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/size/${id}`, // Use the ID in the URL
                method: 'PATCH',
                body: formData, // Send the body with the form data (without including ID in body)
            }),
            invalidatesTags: ['Size'],
        }),
        deleteSize: builder.mutation({
            query: (id) => ({
                url: `/size/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Size'],
        }),
    }),
});

export const {
    useAddSizeMutation,
    useGetAllSizeQuery,
    useGetSingleSizeQuery,
    useUpdateSizeMutation,
    useDeleteSizeMutation,
} = sizeApi;
