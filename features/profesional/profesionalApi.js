import { baseApi } from '../../utils/apiBaseQuery';
import { getUser } from '../../utils/storage';

export const profesionalApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProfessional: builder.query({
            query: (params = {}) => {
                const cleanedParams = {};
                if (params && typeof params === 'object') {
                    Object.keys(params).forEach((key) => {
                        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
                            cleanedParams[key] = params[key];
                        }
                    });
                }
                const loggedUser = getUser();
                const userId = cleanedParams.user || cleanedParams.userId || loggedUser?._id || loggedUser?.id;
                if (userId && !cleanedParams.user) {
                    cleanedParams.user = userId;
                }
                return {
                    url: "/professionals/active",
                    method: "GET",
                    params: cleanedParams,
                };
            },
            providesTags: ["professional"]
        }),

        getSingleProfessional: builder.query({
            query: (args) => {
                const professionalId = typeof args === 'object' ? (args.professionalId || args.id) : args;
                const explicitUser = typeof args === 'object' ? (args.user || args.userId) : null;
                const loggedUser = getUser();
                const userId = explicitUser || loggedUser?._id || loggedUser?.id;

                const params = {};
                if (professionalId) {
                    params.professional = professionalId;
                }
                if (userId) {
                    params.user = userId;
                }

                return {
                    url: "/professionals/active",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["professional"]
        }),

        getServiceByProfessional: builder.query({
            query: ({ professionalId }) => ({
                url: `/services/professional/${professionalId}`,
                method: "GET",
            }),
            providesTags: ["professional"]
        }),

        getProfessionalsBySalonId: builder.query({
            query: (args) => {
                const salonId = typeof args === 'object' ? (args.salonId || args.id) : args;
                const explicitUser = typeof args === 'object' ? (args.user || args.userId) : null;
                const loggedUser = getUser();
                const userId = explicitUser || loggedUser?._id || loggedUser?.id;

                const params = {};
                if (salonId) {
                    params.salon = salonId;
                }
                if (userId) {
                    params.user = userId;
                }

                return {
                    url: "/professionals/active",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["professional"]
        }),

    }),
});

// Export hooks
export const {
    useGetAllProfessionalQuery,
    useGetSingleProfessionalQuery,
    useGetServiceByProfessionalQuery,
    useGetProfessionalsBySalonIdQuery
} = profesionalApi;
