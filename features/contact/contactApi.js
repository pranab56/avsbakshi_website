import { baseApi } from '../../utils/apiBaseQuery';

export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createContact: builder.mutation({
            query: (data) => ({
                url: "/supports/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["contact"],
        }),
    }),
});

// Export hooks
export const {
    useCreateContactMutation,
} = contactApi;
