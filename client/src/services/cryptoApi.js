import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_CRYPTO_API_BASE_URL,
  }),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getCoins: builder.query({ query: () => "/getCoins" }),

    getCoin: builder.query({ query: (uuid) => `/getCoin/${uuid}` }),

    getCoinPriceHistory: builder.query({
      query: ({ uuid, timePeriod }) => `/getCoin/${uuid}/history/${timePeriod}`,
    }),

    getNews: builder.query({
      query: ({ keyword, pageSize }) => `/getNews/${keyword}/${pageSize}`,
    }),
  }),
});

export const {
  useGetCoinsQuery,
  useGetCoinQuery,
  useGetCoinPriceHistoryQuery,
  useGetNewsQuery,
} = cryptoApi;
