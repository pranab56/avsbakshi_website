import { baseApi } from '../../utils/apiBaseQuery';


let baseurl = "https://salonai.sobhoy.com";

export const botApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        TextChatInquiry: builder.mutation({
            query: (credentials) => ({
                url: baseurl + "/api/chat",
                method: "POST",
                body: credentials,
            }),
        }),


        TextChatSelectSlot: builder.mutation({
            query: (credentials) => ({
                url: baseurl + "/api/chat",
                method: "POST",
                body: credentials,
            }),
        }),

        TextChatProvideEmail: builder.mutation({
            query: (credentials) => ({
                url: baseurl + "/api/chat",
                method: "POST",
                body: credentials,
            }),
        }),


        VoiceInput: builder.mutation({
            query: (credentials) => ({
                url: baseurl + "/api/chat/voice",
                method: "POST",
                body: credentials,
            }),
        }),

        getConversationHistory: builder.query({
            query: (sessionId) => ({
                url: baseurl + `/api/chat/history/${sessionId}`,
                method: "GET",
            }),
        }),


    }),
});

// Export hooks
export const {
    useTextChatInquiryMutation,
    useTextChatSelectSlotMutation,
    useTextChatProvideEmailMutation,
    useVoiceInputMutation,
    useGetConversationHistoryQuery,
} = botApi;
