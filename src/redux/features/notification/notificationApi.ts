import { baseApi } from '../../api/baseApi';

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
        getNotification: builder.query({
            query: () => {
                return {
                    url: '/notification/admin',
                    method: 'GET',
                };
            },
            providesTags: ['Notification'],
        }),

        deleteAllNotifications: builder.mutation({
            query: () => ({
                url: '/notification/delete-all',
                method: 'DELETE',
            }),
            invalidatesTags: ['Notification'],
        }),
        readNotification: builder.mutation({
            query: () => ({
                url: `/notification/admin`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Notification'],
        }),

        getANotification: builder.query({
            query: () => ({
                url: `/notification/admin`,
                method: 'GET',
            }),
            providesTags: ['Notification'],
        }),
    }),
});

export const {
    useGetAllNotificationQuery,
    useSeeNofiticationMutation,
    useGetNotificationQuery,
    useDeleteAllNotificationsMutation,
    useReadNotificationMutation,
    useGetANotificationQuery,
} = notificationApi;
