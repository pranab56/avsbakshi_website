import { baseApi } from '../../utils/apiBaseQuery';


export const disclaimeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        disclaimer: builder.query({
            query: ({ type }) => ({
                url: `/disclaimers/${type}`,
                method: "GET",
            }),
            providesTags: ["disclaimer"]
        }),
    }),
});

// Export hooks
export const {
    useDisclaimerQuery
} = disclaimeApi;
