import { baseApi } from '../../utils/apiBaseQuery';


export const chairApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createChair: builder.mutation({
            query: (data) => ({
                url: "/chairs/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["chair"]
        }),

        updateChair: builder.mutation({
            query: ({ chairId, data }) => ({
                url: `/chairs/${chairId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["chair"]
        }),

        getMyChairs: builder.query({
            query: (params = {}) => ({
                url: params?.page ? `/chairs/my-chairs?page=${params.page}` : "/chairs/my-chairs",
                method: "GET",
            }),
            providesTags: ["chair"]
        }),

        getAllChairs: builder.query({
            query: () => ({
                url: "/chairs",
                method: "GET",
            }),
            providesTags: ["chair"]
        }),

        getSingleChair: builder.query({
            query: (id) => ({
                url: `/chairs/single/${id}`,
                method: "GET",
            }),
            providesTags: ["chair"]
        }),

        deleteChair: builder.mutation({
            query: (arg) => {
                const chairId = typeof arg === "string" ? arg : arg?.chairId;
                return {
                    url: `/chairs/${chairId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["chair"]
        }),

    }),
});

// Export hooks
export const {
    useCreateChairMutation,
    useUpdateChairMutation,
    useGetMyChairsQuery,
    useGetAllChairsQuery,
    useDeleteChairMutation,
    useGetSingleChairQuery,
} = chairApi;
