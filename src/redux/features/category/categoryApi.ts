import { baseApi } from '../../api/baseApi';

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => ({
                url: `/category`,
                method: 'GET',
            }),
            providesTags: ['Category'],
        }),
        addCategory: builder.mutation({
            query: (data) => ({
                url: `/category/create-category`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Category'],
        }),
        getSingleCategory: builder.query({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'GET',
            }),
            providesTags: ['Category'],
        }),
        updateCategory: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/category/${id}`, // Use the ID in the URL
                method: 'PATCH',
                body: formData, // Send the body with the form data (without including ID in body)
            }),
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const {
    useGetAllCategoryQuery,
    useAddCategoryMutation,
    useGetSingleCategoryQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
