import { baseApi } from '../../utils/apiBaseQuery';

export const businessApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBusiness: builder.mutation({
            query: (data) => ({
                url: "/professionals/me",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["profile"],
        }),
    }),
});

// Export hooks
export const {
    useCreateBusinessMutation,
} = businessApi;
