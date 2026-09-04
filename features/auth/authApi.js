import { baseApi } from '../../utils/apiBaseQuery';



export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    signUp: builder.mutation({
      query: (data) => ({
        url: "/users/create-user",
        method: "POST",
        body: data,
      }),
    }),

    forgotEmail: builder.mutation({
      query: (forgotEmail) => ({
        url: "/auth/generate-otp",
        method: "POST",
        body: forgotEmail,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),


    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/generate-otp",
        method: "POST",
        body: data,
      }),
    }),


    resendPassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `/auth/reset-password`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: data,
      }),
    }),

  }),
});

// Export hooks
export const {
  useLoginMutation,
  useSignUpMutation,
  useForgotEmailMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useResendPasswordMutation,
} = authApi;
