import { baseApi } from '../../api/baseApi';

type TQueryParams = {
    name: string;
    value: string | number | boolean | null; // adjust as needed
};

// Define the structure of the paginated response
type TApiResponseWithPagination<T> = {
    data: {
        result: T[];
        meta: {
            currentPage: number;
            limit: number;
            page: number;
            total: number;
            totalPages: number;
        };
    };
};

// Define the User object (adjust properties based on actual structure)
export interface IProduct {
    id: string;
    category: string;
    colour: string;
    name: string;
    image: string[];
    features: string[];
    video: string;
    price: number;
    description: string;
    size: string[];
    gender: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProduct: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((arg: TQueryParams) => {
                        // Only append parameters with non-empty values
                        if (arg.value !== null && arg.value !== false && arg.value !== '') {
                            params.append(arg.name, arg.value as string);
                        }
                    });
                }

                return {
                    url: '/product',
                    method: 'GET',
                    params,
                };
            },
            transformResponse: (response: TApiResponseWithPagination<IProduct>) => {
                return { data: response.data.result, meta: response.data.meta };
            },
            providesTags: ['Product'],
        }),
        getGetSingleProduct: builder.query({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (arg) => ({
                url: `/product/${arg.id}`,
                method: 'PATCH',
                body: arg.data,
            }),
            invalidatesTags: ['Product'],
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: `/product/create-product`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const {
    useGetAllProductQuery,
    useGetGetSingleProductQuery,
    useDeleteProductMutation,
    useAddProductMutation,
    useUpdateProductMutation,
} = productApi;
