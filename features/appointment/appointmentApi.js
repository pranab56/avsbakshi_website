import { baseApi } from '../../utils/apiBaseQuery';

export const appointmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createAppointment: builder.mutation({
            query: (data) => ({
                url: "/appointments/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["appointments"],
        }),

        updateStatus: builder.mutation({
            query: ({ id, data }) => ({
                url: `/appointments/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["appointments"],
        }),


        getSingleAppointment: builder.query({
            query: ({ id }) => ({
                url: `/appointments/single/${id}`,
                method: "GET",
            }),
            providesTags: ["appointments"],
        }),


        getMyAppointment: builder.query({
            query: () => ({
                url: "/appointments/me",
                method: "GET",
            }),
            providesTags: ["appointments"],
        }),
    }),
});

// Export hooks
export const {
    useCreateAppointmentMutation,
    useGetMyAppointmentQuery,
    useGetSingleAppointmentQuery,
    useUpdateStatusMutation,
} = appointmentApi;
