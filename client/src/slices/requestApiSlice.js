import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.VITE_SERVER_URL });

const REQUEST_URL = "/api/quotations";

export const requestApiSlice = createApi({
  reducerPath: "requestApiSlice",
  baseQuery,
  tagType: ["Request"],
  endpoints: (builder) => ({
    requestQuotation: builder.mutation({
      query: (data) => ({
        url: `${REQUEST_URL}/request-quotation`,
        method: "POST",
        body: data,
      }),
    }),
    getAllRequestQuotation: builder.query({
      query: (data) => ({
        url: `${REQUEST_URL}/`,
        method: "GET",
        params: data,
      }),
    }),
  }),
});

export const { useRequestQuotationMutation, useGetAllRequestQuotationQuery } =
  requestApiSlice;
