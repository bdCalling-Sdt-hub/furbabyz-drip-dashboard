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
export interface ITransaction {
    id: string;
    title: string;
    des: string;
    image: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTransaction: builder.query({
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
                    url: '/payment',
                    method: 'GET',
                    params,
                };
            },
            providesTags: ['Transaction'],
            transformResponse: (response: TApiResponseWithPagination<any>) => {
                return { data: response.data.result, meta: response.data.meta };
            },
        }),
        getGetSingleTransaction: builder.query<any, string>({
            query: (id) => ({
                url: `/payment/${id}`,
                method: 'GET',
            }),
            providesTags: ['Blog'],
        }),
    }),
});

export const { useGetAllTransactionQuery, useGetGetSingleTransactionQuery } = transactionApi;
