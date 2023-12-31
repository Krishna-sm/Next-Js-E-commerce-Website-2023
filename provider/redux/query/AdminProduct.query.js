import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const AdminProduct = createApi({
  reducerPath: "AdminProduct",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admin/product" }),
  endpoints: (builder) => ({
    addproduct: builder.mutation({
      query: (obj) => ({
        url: "/add-product",
        method: "POST",
        body: obj,
      }),
    }),
    getProducts: builder.query({
      query: (obj) => ({
        url: "/get-product",
        method: "GET",
      }),
    }),
    editProduct: builder.mutation({
      query: (obj) => ({
        url: "/edit-product",
        method: "PUT",
        body: { id: obj },
      }),
    }),
    deleteProduct: builder.mutation({
      query: (obj) => ({
        url: "/delete-product",
        method: "POST",
        body: { id: obj },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined AuthApi
export const {
 useAddproductMutation,
useGetProductsQuery,
useEditProductMutation,
useDeleteProductMutation
} = AdminProduct;