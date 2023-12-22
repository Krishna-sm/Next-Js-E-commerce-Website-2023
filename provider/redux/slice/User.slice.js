import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const UserSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
   
    setUser:(state,action)=>{
        state.user = action.payload
    },
    removeUser:(state,action)=>{
        state.user = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, removeUser } = UserSlice.actions
