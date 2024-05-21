import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.VITE_SERVER_URL });

const OFFER_URL = "/api/offers";

export const offerApiSlice = createApi({
  reducerPath: "offerApiSlice",
  baseQuery,
  tagType: ["offer"],
  endpoints: (builder) => ({
    addOffer: builder.mutation({
      query: (data) => ({
        url: `${OFFER_URL}/add-offer`,
        method: "POST",
        body: data,
      }),
    }),
    getOffer: builder.query({
      query: (id) => ({
        url: `${OFFER_URL}/get-offer/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddOfferMutation, useGetOfferQuery } = offerApiSlice;
