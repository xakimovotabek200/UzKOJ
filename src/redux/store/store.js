import { configureStore } from "@reduxjs/toolkit";
import textReducer from "../text";
import accesibilityReducer from "../accesibility";
import deadlineReducer from "../deadline";

export const store = configureStore({
  reducer: {
    text: textReducer,
    accesibility: accesibilityReducer,
    deadline: deadlineReducer,
  },
});
