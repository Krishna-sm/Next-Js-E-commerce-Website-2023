// const { configureStore } = require("@reduxjs/toolkit");
import  { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer:{

    },
    middleware:(d)=>d().concat()
})

setupListeners(store.dispatch)