import { baseApi } from '../../utils/apiBaseQuery';


export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: () => ({
                url: "/users/me",
                method: "GET",
            }),
            providesTags: ["profile"]
        }),

        updateMyProfile: builder.mutation({
            query: (data) => ({
                url: "/users/me",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["profile"]
        }),

        changePassword: builder.mutation({
            query: (data) => ({
                url: "/auth/change-password",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["profile"]
        }),
    }),
});

// Export hooks
export const {
    useGetMyProfileQuery,
    useUpdateMyProfileMutation,
    useChangePasswordMutation
} = profileApi;
