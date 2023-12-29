// const { configureStore } = require("@reduxjs/toolkit");
import  { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { AuthApi } from "./query/Auth.query";
import { AdminCategory } from "./query/AdminCategory.query";
import { UserSlice } from "./slice/User.slice";

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserSlice.name]: UserSlice.reducer,
    [AdminCategory.reducerPath]: AdminCategory.reducer,
  },
  middleware: (d) => d().concat(AuthApi.middleware, AdminCategory.middleware),
});

setupListeners(store.dispatch)