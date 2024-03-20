import { configureStore } from "@reduxjs/toolkit";
import textReducer from "../text";
import accesibilityReducer from "../accesibility";

export const store = configureStore({
  reducer: {
    text: textReducer,
    accesibility: accesibilityReducer,
  },
});
