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
            query: ({ chairRentalId, id, data, ...rest }) => {
                const targetId = chairRentalId || id;
                const body = data !== undefined ? data : rest;
                return {
                    url: `/chair-rentals/${targetId}`,
                    method: "PATCH",
                    body,
                };
            },
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
            query: (params = {}) => {
                const page = typeof params === "number" ? params : (params?.page || 1);
                const limit = params?.limit;
                const search = params?.searchTerm || params?.search;
                const status = params?.status;

                let url = `/chair-rentals?page=${page}`;
                if (limit) url += `&limit=${limit}`;
                if (search) url += `&search=${encodeURIComponent(search)}`;
                if (status && status !== "all") url += `&status=${encodeURIComponent(status)}`;

                return {
                    url,
                    method: "GET",
                };
            },
            providesTags: ["chairRental"]
        }),

        getSingleCharRentals: builder.query({
            query: (id) => ({
                url: `/chair-rentals/single/${id}`,
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
    useGetSingleCharRentalsQuery,
    useGetMyRentalsQuery
} = chairRentalApi;

export const useGetSingleChairRentalQuery = chairRentalApi.useGetSingleCharRentalsQuery;
