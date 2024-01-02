import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const CartApi = createApi({
  reducerPath: "CartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/cart",
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (obj) => ({
        url: "/add-cart",
        method: "POST",
        body: { id: obj },
      }),
    }),
    getCarts: builder.query({
      query: (obj) => ({
        url: "/get-cart",
        method: "GET",
      }),
    }),
    editCart: builder.mutation({
      query: (obj) => ({
        url: "/edit-cart",
        method: "POST",
        body:{
          id:obj.id,
          action:obj.action
        }
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined AuthApi
export const {
  useAddToCartMutation,
  useGetCartsQuery,
  useEditCartMutation
} = CartApi;
