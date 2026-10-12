import { baseApi } from '../../utils/apiBaseQuery';
import { getUser } from '../../utils/storage';

export const salonApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        createSalon: builder.mutation({
            query: (data) => ({
                url: "/salons/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["salon", "profile"]
        }),

        updateSalon: builder.mutation({
            query: ({ salonId, data }) => ({
                url: `/salons/${salonId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["salon"]
        }),

        getMySalon: builder.query({
            query: () => ({
                url: "/salons/my-salon",
                method: "GET",
            }),
            providesTags: ["salon"]
        }),

        getAllSalons: builder.query({
            query: (params = {}) => {
                const cleanedParams = {};
                if (params && typeof params === 'object') {
                    Object.keys(params).forEach((key) => {
                        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
                            cleanedParams[key] = params[key];
                        }
                    });
                }

                return {
                    url: "/salons",
                    method: "GET",
                    params: cleanedParams,
                };
            },
            providesTags: ["salon"]
        }),

        getSingleSalon: builder.query({
            query: (args) => {
                const id = typeof args === 'object' ? (args.id || args.salonId) : args;
                const explicitUser = typeof args === 'object' ? (args.user || args.userId) : null;
                const loggedUser = getUser();
                const userId = explicitUser || loggedUser?._id || loggedUser?.id;
                const params = {};
                if (userId) {
                    params.user = userId;
                }
                return {
                    url: `/salons/${id}`,
                    method: "GET",
                    params,
                };
            },
            providesTags: ["salon"]
        }),

    }),
});

// Export hooks
export const {
    useCreateSalonMutation,
    useUpdateSalonMutation,
    useGetMySalonQuery,
    useGetAllSalonsQuery,
    useGetSingleSalonQuery
} = salonApi;
