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
    role: null,
    fetchedQuestion: [  ]
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
            state.role = action.payload.role;
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
            state.role = null;
        },
        setQuestion: (state, action) => {
            state.question = action.payload;
        },
        setSubject: (state, action) => {
            state.subject = action.payload;
        },
        setFetchedQuestionArray:(state, action) => {
            state.fetchedQuestion = action.payload
        }
    },
});

export const { login, logout, setQuestion, setSubject, setFetchedQuestionArray } = authSlice.actions;
export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
export const hasPermission = (state) => state.auth.role;
export const getToken = (state) => state.auth.token;
export const getFirstName = (state) => state.auth.first_name;
export const getLastName = (state) => state.auth.last_name;
export const getStudentType = (state) => state.auth.student_type;
export const getLevel = (state) => state.auth.level;
export const getQuestion = (state) => state.auth.question;
export const getSubject = (state) => state.auth.subject;
export const getQuestionsArray = (state) => state.auth.fetchedQuestion;

export default authSlice.reducer;
