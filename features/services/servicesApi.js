import { baseApi } from '../../utils/apiBaseQuery';

export const servicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createServices: builder.mutation({
            query: (data) => ({
                url: "/services/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["services"]
        }),

        updateServices: builder.mutation({
            query: ({ id, data }) => ({
                url: `/services/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["services"]
        }),

        deleteServices: builder.mutation({
            query: ({ id }) => ({
                url: `/services/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["services"]
        }),

        getSingleService: builder.query({
            query: ({ id }) => ({
                url: `/services/single/${id}`,
                method: "GET",
            }),
            providesTags: ["services"]
        }),

        getMyServices: builder.query({
            query: () => ({
                url: "/services/my-services",
                method: "GET",
            }),
            providesTags: ["services"]
        }),

        getAllCategories: builder.query({
            query: () => ({
                url: "/category",
                method: "GET",
            }),
            providesTags: ["category"]
        }),
    }),
});

// Export hooks
export const {
    useCreateServicesMutation,
    useUpdateServicesMutation,
    useDeleteServicesMutation,
    useGetSingleServiceQuery,
    useGetMyServicesQuery,
    useGetAllCategoriesQuery,
} = servicesApi;
