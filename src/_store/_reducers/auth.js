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
    topic: null,
    role: null,
    avatar: null,
    fetchedQuestion: [],
    child_id: null,
    address: null,
    parentBackup: null,
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
            state.avatar = action.payload.avatar;
            state.child_id = action.payload.child_id;
            state.address = action.payload.address;
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
            state.avatar = null;
            state.child_id = null;
            state.address = null;
        },
        setQuestion: (state, action) => {
            state.question = action.payload;
        },
        setSubject: (state, action) => {
            state.subject = action.payload;
        },
        setTopic: (state, action) => {
            state.topic = action.payload;
        },
        setFetchedQuestionArray: (state, action) => {
            state.fetchedQuestion = action.payload
        },
        setParentBackup: (state, action) => {
            state.parentBackup = action.payload;
        },
    },
});

export const { login, logout, setQuestion, setSubject, setTopic, setFetchedQuestionArray, setParentBackup } = authSlice.actions;
export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
export const hasPermission = (state) => state.auth.role;
export const getToken = (state) => state.auth.token;
export const getFirstName = (state) => state.auth.first_name;
export const getLastName = (state) => state.auth.last_name;
export const getStudentType = (state) => state.auth.student_type;
export const getLevel = (state) => state.auth.level;
export const getQuestion = (state) => state.auth.question;
export const getSubject = (state) => state.auth.subject;
export const getTopic = (state) => state.auth.topic;
export const getQuestionsArray = (state) => state.auth.fetchedQuestion;
export const getParentBackup = (state) => state.auth.parentBackup;
export const getAvatar = (state) => state.auth.avatar;
export const getChildId = (state) => state.auth.child_id;
export const getaddress = (state) => state.auth.address;
export default authSlice.reducer;
