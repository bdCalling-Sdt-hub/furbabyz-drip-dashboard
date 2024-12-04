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
export interface IFaq {
    id: string;
    question: string;
    answer: string;
    image: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const faqApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFaq: builder.query({
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
                    url: '/faq',
                    method: 'GET',
                    params,
                };
            },
            transformResponse: (response: TApiResponseWithPagination<IFaq>) => {
                return { data: response.data.result, meta: response.data.meta };
            },
        }),
        getSingleFaq: builder.query<any, string>({
            query: (id) => ({
                url: `/faq/${id}`,
                method: 'GET',
            }),
        }),
        deleteFaq: builder.mutation({
            query: (id) => ({
                url: `/faq/${id}`,
                method: 'DELETE',
            }),
        }),
        addFaq: builder.mutation({
            query: (data) => ({
                url: '/faq/create-faq',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useDeleteFaqMutation, useGetAllFaqQuery, useGetSingleFaqQuery, useAddFaqMutation } = faqApi;
