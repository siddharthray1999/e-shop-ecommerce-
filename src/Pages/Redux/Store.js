import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/AuthSlice";
const rootReducer = combineReducers({
  auth: authReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export default store;
