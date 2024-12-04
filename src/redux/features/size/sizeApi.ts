import { baseApi } from '../../api/baseApi';

const sizeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSize: builder.query({
            query: () => ({
                url: `/size/get-size`,
                method: 'GET',
            }),
        }),
        addSize: builder.mutation({
            query: (data) => ({
                url: `/size/create-size`,
                method: 'POST',
                body: data,
            }),
        }),
        getSingleSize: builder.query({
            query: (id) => ({
                url: `/size/${id}`,
                method: 'GET',
            }),
        }),
        updateSize: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/size/${id}`, // Use the ID in the URL
                method: 'PATCH',
                body: formData, // Send the body with the form data (without including ID in body)
            }),
        }),
        deleteSize: builder.mutation({
            query: (id) => ({
                url: `/size/${id}`,
                method: 'DELETE',
            }),
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
