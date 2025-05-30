import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    token: null,
    first_name: null,
    last_name: null,
    student_type: null,
    level: null,
    question: null,
    subject: null,
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
            state.level = action.payload.level;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.first_name = null;
            state.last_name = null;
            state.student_type = null;
            state.level = null;
            state.question = null;
            state.subject = null;
        },
        setQuestion: (state, action) => {
            state.question = action.payload;
        },
        setSubject: (state, action) => {
            state.subject = action.payload;
        },
    },
});

export const { login, logout, setQuestion, setSubject } = authSlice.actions;
export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
export const getToken = (state) => state.auth.token;
export const getFirstName = (state) => state.auth.first_name;
export const getLastName = (state) => state.auth.last_name;
export const getStudentType = (state) => state.auth.student_type;
export const getLevel = (state) => state.auth.level;
export const getQuestion = (state) => state.auth.question;
export const getSubject = (state) => state.auth.subject;

export default authSlice.reducer;
