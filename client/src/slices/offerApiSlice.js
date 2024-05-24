import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.VITE_SERVER_URL });

const OFFER_URL = "/api/offers";

export const offerApiSlice = createApi({
  reducerPath: "offerApiSlice",
  baseQuery,
  tagTypes: ["offer"],
  endpoints: (builder) => ({
    addOffer: builder.mutation({
      query: (data) => ({
        url: `${OFFER_URL}/add-offer`,
        method: "POST",
        body: data,
      }),
    }),
    getOffer: builder.mutation({
      query: (data) => ({
        url: `${OFFER_URL}/get-offer`,
        method: "POST",
        body: data,
      }),
    }),
    editOffer: builder.mutation({
      query: ({ id, data }) => ({
        url: `${OFFER_URL}/edit-offer/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteOffer: builder.mutation({
      query: (id) => ({
        url: `${OFFER_URL}/delete-offer/${id}`,
        method: "DELETE",
      }),
    }),
    acceptOffer: builder.mutation({
      query: ({ id, data }) => ({
        url: `${OFFER_URL}/accept-offer/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    declineOffer: builder.mutation({
      query: ({ id, data }) => ({
        url: `${OFFER_URL}/decline-offer/${id}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddOfferMutation,
  useGetOfferMutation,
  useEditOfferMutation,
  useDeleteOfferMutation,
  useAcceptOfferMutation,
  useDeclineOfferMutation,
} = offerApiSlice;
