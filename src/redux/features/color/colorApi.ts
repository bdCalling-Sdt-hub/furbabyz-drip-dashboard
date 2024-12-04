import { baseApi } from '../../api/baseApi';

const colorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllColor: builder.query({
            query: () => ({
                url: `/colour/get-colours`,
                method: 'GET',
            }),
        }),
        addColor: builder.mutation({
            query: (data) => ({
                url: `/colour/create-colour`,
                method: 'POST',
                body: data,
            }),
        }),
        getSingleColor: builder.query({
            query: (id) => ({
                url: `/colour/${id}`,
                method: 'GET',
            }),
        }),
        updateColor: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/colour/${id}`, // Use the ID in the URL
                method: 'PATCH',
                body: formData, // Send the body with the form data (without including ID in body)
            }),
        }),
        deleteColor: builder.mutation({
            query: (id) => ({
                url: `/colour/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAllColorQuery,
    useAddColorMutation,
    useGetSingleColorQuery,
    useUpdateColorMutation,
    useDeleteColorMutation,
} = colorApi;
