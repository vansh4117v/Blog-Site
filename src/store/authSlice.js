import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: false,
        userData: {}
    },
    reducers: {
        login: (state, action) => {
            state.status = true
            state.userData = action.payload.userData
            console.log("🚀 ~ userData:", state.userData)
        },
        logout: (state) => {
            state.status = false
            state.userData = null
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer