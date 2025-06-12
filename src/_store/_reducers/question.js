import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    attempts: [],
};

const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        setAttemptQuestions: (state, action) => {
            const { question_id, user_answer, type } = action.payload;
            // Check if question_id already exists
            const existingIndex = state.attempts.findIndex(
                (q) => q.question_id === question_id
            );
            if (existingIndex !== -1) {
                state.attempts[existingIndex] = { question_id, user_answer, type };
            } else {
                state.attempts.push({ question_id, user_answer, type });
            }
        },

    },
});

export const { setAttemptQuestions } = questionSlice.actions;
export const getSelected = (state) => state.question.attempts;


export default questionSlice.reducer;
