import { baseApi } from '../../utils/apiBaseQuery';

export const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotification: builder.query({
            query: (params = {}) => {
                const page = params?.page || 1;
                const limit = params?.limit || 20;
                return {
                    url: `/notifications/me?page=${page}&limit=${limit}`,
                    method: "GET",
                };
            },
            providesTags: ["notification"],
        }),

        readAllNotification: builder.mutation({
            query: () => ({
                url: `/notifications/read-all`,
                method: "PATCH",
            }),
            invalidatesTags: ["notification"],
        }),

        readSingleNotification: builder.mutation({
            query: (id) => ({
                url: `/notifications/${id}/read`,
                method: "PATCH",
            }),
            invalidatesTags: ["notification"],
        }),
    }),
});

// Export hooks
export const {
    useGetAllNotificationQuery,
    useReadAllNotificationMutation,
    useReadSingleNotificationMutation,
} = notificationApi;
