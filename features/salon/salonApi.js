import { baseApi } from '../../utils/apiBaseQuery';


export const salonApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({
        createSalon: builder.mutation({
            query: (data) => ({
                url: "/salons/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["salon", "profile"]
        }),

        updateSalon: builder.mutation({
            query: ({ salonId, data }) => ({
                url: `/salons/${salonId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["salon"]
        }),

        getMySalon: builder.query({
            query: () => ({
                url: "/salons/my-salon",
                method: "GET",
            }),
            providesTags: ["salon"]
        }),
    }),
});

// Export hooks
export const {
    useCreateSalonMutation,
    useUpdateSalonMutation,
    useGetMySalonQuery
} = salonApi;
