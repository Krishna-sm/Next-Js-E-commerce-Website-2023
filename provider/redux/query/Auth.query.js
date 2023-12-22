import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/auth' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (obj) => ({
        url:'/register',
        method:'POST',
        body:obj
      })
    }),
    loginUser: builder.mutation({
      query: (obj) => ({
        url:'/login',
        method:'POST',
        body:obj
      })
    }),
    UserProfile: builder.query({
      query: (obj) => ({
        url:'/profile',
        method:'GET'
      })
    }),
    LogoutUser: builder.mutation({
      query: (obj) => ({
        url:'/logout',
        method:'POST'
      })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined AuthApi
export const { useRegisterUserMutation,useLoginUserMutation,useUserProfileQuery , useLogoutUserMutation} = AuthApi