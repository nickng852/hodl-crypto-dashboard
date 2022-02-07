import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3001";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  refetchOnMountOrArgChange: true, // forcing refetch on component mount
  endpoints: (builder) => ({
    getCoins: builder.query({ query: () => "/getCoins" }),

    getCoin: builder.query({ query: (uuid) => `/getCoins/${uuid}` }),

    getNews: builder.query({ query: (keyword) => `/getNews/${keyword}` }),
  }),
});

export const { useGetCoinsQuery, useGetCoinQuery, useGetNewsQuery } = cryptoApi;
