import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery("");

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
    getUserRequestQuotation: builder.query({
      query: (data) => ({
        url: `${REQUEST_URL}/user-quotations`,
        method: "GET",
        params: data,
      }),
    }),
    getRequestQuotationById: builder.query({
      query: (id) => ({
        url: `${REQUEST_URL}/${id}`,
        method: "GET",
      }),
    }),
    getUserRequestQuotationById: builder.query({
      query: (id) => ({
        url: `${REQUEST_URL}/user-quotations/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRequestQuotationMutation,
  useGetAllRequestQuotationQuery,
  useGetUserRequestQuotationQuery,
  useGetRequestQuotationByIdQuery,
  useGetUserRequestQuotationByIdQuery,
} = requestApiSlice;
