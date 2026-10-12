import { baseApi } from '../../utils/apiBaseQuery';

export const wishListApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addAndRemoveWishList: builder.mutation({
            query: (data) => ({
                url: "/wishlists/toggle",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["wishlist"]
        }),

        getMyWishList: builder.query({
            query: () => ({
                url: "/wishlists/me",
                method: "GET",
            }),
            providesTags: ["wishlist"]
        }),

        deleteMyWishList: builder.mutation({
            query: ({ wishListId }) => ({
                url: `/wishlists/${wishListId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["wishlist"]
        }),

    }),
});

export const {
    useAddAndRemoveWishListMutation,
    useGetMyWishListQuery,
    useDeleteMyWishListMutation,
} = wishListApi;
