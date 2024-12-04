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
export interface IBlog {
    id: string;
    title: string;
    des: string;
    image: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlog: builder.query({
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
                    url: '/blog',
                    method: 'GET',
                    params,
                };
            },
            transformResponse: (response: TApiResponseWithPagination<IBlog>) => {
                return { data: response.data.result, meta: response.data.meta };
            },
        }),
        getGetSingleBlog: builder.query<IBlog, string>({
            query: (id) => ({
                url: `/blog/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetAllBlogQuery, useGetGetSingleBlogQuery } = blogApi;
