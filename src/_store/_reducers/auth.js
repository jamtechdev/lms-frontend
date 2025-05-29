import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    token: null,
    first_name: null,
    last_name: null,
    student_type: null,
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
            state.student_type = action.payload.student_type;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.first_name = null;
            state.last_name = null;
            state.student_type = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
export const getToken = (state) => state.auth.token;
export const getFirstName = (state) => state.auth.first_name;
export const getLastName = (state) => state.auth.last_name;
export const getStudentType = (state) => state.auth.student_type;

export default authSlice.reducer;