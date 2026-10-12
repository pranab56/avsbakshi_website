import { baseApi } from '../../utils/apiBaseQuery';


export const chairRentalApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createChairRental: builder.mutation({
            query: (data) => ({
                url: "/chair-rentals/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["chairRental"]
        }),

        updateChairRental: builder.mutation({
            query: ({ chairRentalId, data }) => ({
                url: `/chair-rentals/${chairRentalId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["chairRental"]
        }),

        getMyChairRentals: builder.query({
            query: () => ({
                url: "/chair-rentals/my-rentals",
                method: "GET",
            }),
            providesTags: ["chairRental"]
        }),

        getSalonRentals: builder.query({
            query: (arg) => {
                const salonId = typeof arg === "string" ? arg : arg?.salonId;
                return {
                    url: `/chair-rentals/salon/${salonId}`,
                    method: "GET",
                };
            },
            providesTags: ["chairRental"]
        }),

        getAllChairRentals: builder.query({
            query: ({ page = 1 } = {}) => ({
                url: `/chairs?page=${page}`,
                method: "GET",
            }),
            providesTags: ["chairRental"]
        }),


        getMyRentals: builder.query({
            query: (params = {}) => ({
                url: params?.page ? `/chair-rentals/my-rentals?page=${params.page}` : "/chair-rentals/my-rentals",
                method: "GET",
            }),
            providesTags: ["chairRental"]
        }),



    }),
});

// Export hooks
export const {
    useCreateChairRentalMutation,
    useUpdateChairRentalMutation,
    useGetMyChairRentalsQuery,
    useGetSalonRentalsQuery,
    useGetAllChairRentalsQuery,
    useGetMyRentalsQuery
} = chairRentalApi;
