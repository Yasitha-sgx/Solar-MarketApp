import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_STRAPI_URL,
});

const BLOG_URL = "/api/blogs";

export const blogApiSlice = createApi({
  reducerPath: "blogApiSlice",
  baseQuery,
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (data) => ({
        url: `${BLOG_URL}?populate=image,metaData.metaImage&pagination[pageSize]=${data.pageSize}&pagination[page]=${data.page}&sort[0]=publishedAt:desc`,
        method: "GET",
      }),
    }),
    getBlog: builder.query({
      query: (id) => ({
        url: `${BLOG_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllBlogsQuery, useGetBlogQuery } = blogApiSlice;
