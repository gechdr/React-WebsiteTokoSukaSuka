import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002/" }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `users`,
    }),
    getBarang: builder.query({
      query: () => `barang`,
    }),
    getKategori: builder.query({
      query: () => `kategori`,
    }),
    getMerk: builder.query({
      query: () => `merk`,
    }),
  }),
});
export const {
  useGetUserQuery,
  useGetBarangQuery,
  useGetKategoriQuery,
  useGetMerkQuery,
} = api;
