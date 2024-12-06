import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://192.168.10.18:5050/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQuery,
    endpoints: () => ({}),
    tagTypes: [
        'User',
        'Blog',
        'Faq',
        'Color',
        'Size',
        'Category',
        'Product',
        'Transaction',
        'TermAndCondition',
        'ReturnPolicy',
        'Notification',
        'Reset',
    ],
});
