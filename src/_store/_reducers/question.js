import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    attempts: [],
    assignments: [],
};

const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        setAttemptQuestions: (state, action) => {
            const { question_id, answer, user_answer, type } = action.payload;
            const existingIndex = state.attempts.findIndex(
                (q) => q.question_id === question_id
            );
            if (existingIndex !== -1) {
                state.attempts[existingIndex] = { question_id, answer, user_answer, type };
            } else {
                state.attempts.push({ question_id, answer, user_answer, type });
            }
        },
        removeAttemptQuestions: (state) => {
            state.attempts = [];
        },
        setAssignmentsQuestion: (state, action) => {
            const { question_id, user_answer, type } = action.payload;
            const existingIndex = state.assignments.findIndex(
                (q) => q.question_id === question_id
            );
            if (existingIndex !== -1) {
                state.assignments[existingIndex] = { question_id, user_answer, type };
            } else {
                state.assignments.push({ question_id, user_answer, type });
            }
        },
        removeAssignmentsQuestion: (state) => {
            state.assignments = [];
        },
    },
});

export const { setAttemptQuestions, removeAttemptQuestions, setAssignmentsQuestion, removeAssignmentsQuestion } = questionSlice.actions;
export const getSelected = (state) => state.question.attempts;
export const getAssignmentsQuestion = (state) => state.question.assignments;


export default questionSlice.reducer;
