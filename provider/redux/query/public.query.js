import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const PublicQuery = createApi({
  reducerPath: "PublicQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/public",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (obj) => ({
        url: "/get-categories",
        method: "GET",
      }),
    }),
  
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined AuthApi
export const {
    useGetCategoriesQuery
} = PublicQuery;
