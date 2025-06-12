import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth";
import questionSlice from "./question";

const rootReducer = combineReducers({
    auth: authSlice,
    question: questionSlice
});
export default rootReducer;
