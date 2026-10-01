import { baseApi } from '../../utils/apiBaseQuery';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // 2. Signup
    signUp: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),

    // 3. Forgot Password Email (Generate OTP)
    forgotEmail: builder.mutation({
      query: (forgotEmail) => ({
        url: "/auth/generate-otp",
        method: "POST",
        body: forgotEmail,
      }),
    }),

    // 4. Verify Email / OTP
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),

    // 5. Resend OTP
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/generate-otp",
        method: "POST",
        body: data,
      }),
    }),

    // 6. Reset Password
    resetPassword: builder.mutation({
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
  useResetPasswordMutation,
  useResendPasswordMutation,
} = authApi;

