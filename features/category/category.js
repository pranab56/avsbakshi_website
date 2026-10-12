import { baseApi } from '../../utils/apiBaseQuery';

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: (params = {}) => ({
                url: "/categories",
                method: "GET",
                params,
            }),
            providesTags: ["category"]
        }),
    }),
});

// Export hooks
export const {
    useGetAllCategoryQuery
} = categoryApi;
