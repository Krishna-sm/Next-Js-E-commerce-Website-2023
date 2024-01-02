// const { configureStore } = require("@reduxjs/toolkit");
import  { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { AuthApi } from "./query/Auth.query";
import { AdminCategory } from "./query/AdminCategory.query";
import { AdminProduct } from "./query/AdminProduct.query";
import { PublicQuery } from "./query/public.query";
import { CartApi } from "./query/cart.query";
import { UserSlice } from "./slice/User.slice";

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserSlice.name]: UserSlice.reducer,
    [AdminCategory.reducerPath]: AdminCategory.reducer,
    [AdminProduct.reducerPath]: AdminProduct.reducer,
    [PublicQuery.reducerPath]: PublicQuery.reducer,
    [CartApi.reducerPath]: CartApi.reducer,
  },
  middleware: (d) =>
    d().concat(
      AuthApi.middleware,
      AdminCategory.middleware,
      AdminProduct.middleware,
      PublicQuery.middleware,
      CartApi.middleware
    ),
});

setupListeners(store.dispatch)