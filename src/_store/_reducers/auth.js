import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    token: null,
    first_name: null,
    last_name: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.first_name = null;
            state.last_name = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
export const getToken = (state) => state.auth.token;
export const getFirstName = (state) => state.auth.first_name;
export const getLastName = (state) => state.auth.last_name;

export default authSlice.reducer;