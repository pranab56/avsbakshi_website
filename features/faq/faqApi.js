import { baseApi } from '../../utils/apiBaseQuery';


export const faqApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        FAQList: builder.query({
            query: () => ({
                url: "/faqs",
                method: "GET",
            }),
            providesTags: ["faq"]
        }),
    }),
});

// Export hooks
export const {
    useFAQListQuery
} = faqApi;
