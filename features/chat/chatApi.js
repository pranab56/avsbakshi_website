import { baseApi } from '../../utils/apiBaseQuery';

export const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createChat: builder.mutation({
            query: (data) => ({
                url: "/chats/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["chats"],
        }),

         getAllChats: builder.query({
            query: (params) => ({
                url: `/chats/me`,
                method: "GET",
                params: params,
            }),
            providesTags: ["chats"],
        }),

        deleteChat: builder.mutation({
            query: (id) => {
                const chatId = typeof id === "object" ? id.id : id;
                return {
                    url: `/chats/${chatId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["chats"],
        }),

    }),
});

// Export hooks
export const {
    useCreateChatMutation,
    useGetAllChatsQuery,
    useDeleteChatMutation,
} = chatApi;
