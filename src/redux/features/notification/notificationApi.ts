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
            nextPage: boolean; // Assuming `nextPage` exists
        };
    };
};

// Define the User object (adjust properties based on actual structure)
export interface IUser {
    id: string;
    text: string;
    receiver: string;
    read: string;
    createdAt: string;
    type: string;
}

const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotification: builder.query({
            query: ({ page, limit }: { page: number; limit: number }) => {
                const params = new URLSearchParams();
                params.append('page', page.toString());
                params.append('limit', limit.toString());

                return {
                    url: '/notification/admin',
                    method: 'GET',
                    params,
                };
            },
            providesTags: ['Notification'],
            transformResponse: (response: TApiResponseWithPagination<any>) => {
                return { data: response.data.result, meta: response.data.meta };
            },
        }),

        seeNofitication: builder.mutation({
            query: (data) => ({
                url: `/setting/create-terms`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Notification'],
        }),
    }),
});

export const { useGetAllNotificationQuery, useSeeNofiticationMutation } = notificationApi;
