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
export interface IUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    image?: string;
    role: string;
    status: string;
    country: string;
    address: string;
    createdAt: string;
    updatedAt: string;
}

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
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
                    url: '/user/get-all-users',
                    method: 'GET',
                    params,
                };
            },
            transformResponse: (response: TApiResponseWithPagination<IUser>) => {
                return { data: response.data.result, meta: response.data.meta };
            },
        }),
        getSingleUser: builder.query<IUser, string>({
            query: (id) => ({
                url: `/user/get-all-users/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetAllUsersQuery, useGetSingleUserQuery } = userApi;
