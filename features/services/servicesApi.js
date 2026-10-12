import { baseApi } from '../../utils/apiBaseQuery';

export const servicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllServices: builder.query({
            query: ({ searchTerm, page, category }) => ({
                url: `/services/all?searchTerm=${searchTerm}&page=${page}&category=${category}`,
                method: "GET",
            }),
            providesTags: ["services"]
        }),

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

        getAllServices: builder.query({
            query: ({ page = 1, searchTerm = "", categoryId = "", latitude = "", longitude = "" } = {}) => {
                let url = `/services/all?searchTerm=${encodeURIComponent(searchTerm)}&page=${page}&category=${encodeURIComponent(categoryId)}`;
                if (latitude) url += `&latitude=${encodeURIComponent(latitude)}`;
                if (longitude) url += `&longitude=${encodeURIComponent(longitude)}`;
                return {
                    url,
                    method: "GET",
                };
            },
            providesTags: ["services"]
        }),

        getAllServiceByProfessionalId: builder.query({
            query: ({ professionalId, page = 1, }) => ({
                url: `/services/all?professionalId=${professionalId}&page=${page}`,
                method: "GET",
            }),
            providesTags: ["services"]
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
    useGetAllServicesQuery
} = servicesApi;
