import { baseApi } from '../../api/baseApi';

const resetApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        resetEmail: builder.mutation({
            query: (data) => ({
                url: `/auth/forgot-password`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Reset'],
        }),

        verifyOtp: builder.mutation({
            query: (data) => ({
                url: `/auth/verify-email`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Reset'],
        }),
        resetPassword: builder.mutation({
            query: (data) => {
                console.log(data, 'hgyhhgghghg');
                const token = localStorage.getItem('Authorization');
                console.log(token, 'asdasdsadasdbasdjgasjdgasjkdghsajkdg');
                return {
                    url: `/auth/reset-password`,
                    method: 'POST',
                    body: data,
                    headers: {
                        Authorization: token ? token : '', // null থাকলে খালি স্ট্রিং ব্যবহার করা হচ্ছে
                    },
                };
            },
            invalidatesTags: ['Reset'],
        }),
    }),
});

export const { useResetEmailMutation, useVerifyOtpMutation, useResetPasswordMutation } = resetApi;
