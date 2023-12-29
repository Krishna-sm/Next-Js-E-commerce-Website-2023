import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const AdminCategory = createApi({
  reducerPath: "AdminCategory",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admin/category" }),
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (obj) => ({
        url: "/add-category",
        method: "POST",
        body: obj,
      }),
    }),
    getCategories: builder.query({
      query: (obj) => ({
        url: "/get-category",
        method: "GET",
      }),
    }),
    editCategory: builder.mutation({
      query: (obj) => ({
        url: "/edit-category",
        method: "PUT",
        body: { id: obj },
      }),
    }),
    deleteCategory: builder.mutation({
      query: (obj) => ({
        url: "/delete-category",
        method: "POST",
        body: { id: obj },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined AuthApi
export const {
 useAddCategoryMutation,
 useGetCategoriesQuery,
 useEditCategoryMutation,
 useDeleteCategoryMutation
} = AdminCategory;