import { baseApi } from '../../api/baseApi';

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStatistics: builder.query({
            query: () => ({
                url: `/dashboard/get-total-statistics`,
                method: 'GET',
            }),
        }),
        getEarningChart: builder.query({
            query: ({ year }) => ({
                url: `/dashboard/get-total-earning-chart?year=${year}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetStatisticsQuery, useGetEarningChartQuery } = userApi;
