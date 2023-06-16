import { combineReducers } from "redux";
import { todoSlice } from "./detail";

export const rootReducer = combineReducers({ todo: todoSlice.reducer });
