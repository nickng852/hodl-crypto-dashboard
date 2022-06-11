import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://crypto-dashboard-heroku.herokuapp.com/";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getCoins: builder.query({ query: () => "/getCoins" }),

    getCoin: builder.query({ query: (uuid) => `/getCoin/${uuid}` }),

    getCoinPriceHistory: builder.query({
      query: ({ uuid, timePeriod }) => `/getCoin/${uuid}/history/${timePeriod}`,
    }),

    getNews: builder.query({
      query: ({ keyword, page, pageSize }) =>
        `/getNews/${keyword}/${page}/${pageSize}`,
    }),
  }),
});

export const {
  useGetCoinsQuery,
  useGetCoinQuery,
  useGetCoinPriceHistoryQuery,
  useGetNewsQuery,
} = cryptoApi;
