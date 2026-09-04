import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Separate API slice (its own base URL, no auth headers) so we don't
// leak our backend's Authorization token to this third-party host.
export const exchangeRateApi = createApi({
  reducerPath: "exchangeRateApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.exchangerate.fun" }),
  endpoints: (builder) => ({
    getExchangeRates: builder.query({
      query: (base = "USD") => `/latest?base=${base}`,
    }),
  }),
});

export const { useLazyGetExchangeRatesQuery } = exchangeRateApi;
