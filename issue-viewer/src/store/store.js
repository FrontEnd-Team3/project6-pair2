// import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
import { rootReducer } from "../reducer/index";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";

// .env(환경변수)
// 환경변수는 언제 사용해야할까?
// 시스템 환경을 변수에 담아서 사용
// 특정 값을 변수에 담아 숨기기 위해 사용
// dotenv, 기본값

export const store = createStore(rootReducer, applyMiddleware(thunk));
