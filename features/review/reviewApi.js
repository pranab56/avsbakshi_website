import { baseApi } from '../../utils/apiBaseQuery';


export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyReviews: builder.query({
            query: () => ({
                url: "/reviews/me",
                method: "GET",
            }),
            providesTags: ["review"]
        }),

        getAllReviews: builder.query({
            query: (params = {}) => {
                const queryParams = new URLSearchParams();
                if (params && typeof params === 'object') {
                    Object.keys(params).forEach((key) => {
                        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
                            queryParams.append(key, params[key]);
                        }
                    });
                }
                const queryString = queryParams.toString();
                return {
                    url: `/reviews${queryString ? `?${queryString}` : ''}`,
                    method: "GET",
                };
            },
            providesTags: ["review"]
        }),
    }),
});

// Export hooks
export const {
    useGetMyReviewsQuery,
    useGetAllReviewsQuery
} = profileApi;

export const reviewApi = profileApi;

