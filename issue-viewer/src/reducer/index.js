import { combineReducers } from "redux";
import { apiSlice } from "./detail";

export const rootReducer = combineReducers({ api: apiSlice.reducer });
