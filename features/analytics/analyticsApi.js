import { baseApi } from '../../utils/apiBaseQuery';

export const analyticsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCustomerOverview: builder.query({
            query: () => ({
                url: "/analytics/overview/customer",
                method: "GET",
            }),
            providesTags: ["overview"]
        }),


        getProfessionalOverview: builder.query({
            query: () => ({
                url: "/analytics/overview/professional",
                method: "GET",
            }),
            providesTags: ["overview"]
        }),
    }),
});

// Export hooks
export const {
    useGetCustomerOverviewQuery,
    useGetProfessionalOverviewQuery
} = analyticsApi;
