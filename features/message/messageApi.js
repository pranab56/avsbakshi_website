import { baseApi } from '../../utils/apiBaseQuery';

export const messageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendMessage: builder.mutation({
            query: (data) => ({
                url: "/messages/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["messages"],
        }),

         editMessage: builder.mutation({
            query: ({id,data}) => ({
                url: `/messages/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["messages"],
        }),

        getMyMessage: builder.query({
            query: (args) => {
                const chatId = typeof args === "object" ? args?.chatId : args;
                return {
                    url: `/messages/chat/${chatId}`,
                    method: "GET",
                };
            },
            providesTags: ["messages"],
        }),

        deleteMessage: builder.mutation({
            query: (id) => {
                const messageId = typeof id === "object" ? id.id : id;
                return {
                    url: `/messages/${messageId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["messages"],
        }),

    }),
});

// Export hooks
export const {
    useSendMessageMutation,
    useEditMessageMutation,
    useGetMyMessageQuery,
    useDeleteMessageMutation,
} = messageApi;
