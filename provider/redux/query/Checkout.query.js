import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const CheckoutQuery = createApi({
  reducerPath: "CheckoutQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/chekout",
  }),
  endpoints: (builder) => ({
    checkoutPayment: builder.mutation({
      query: (obj) => ({
        url: `/add-checkout`,
        method: "POST",
        body:obj
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined AuthApi
export const {
 useCheckoutPaymentMutation
} = CheckoutQuery;
