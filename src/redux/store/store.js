import { configureStore } from "@reduxjs/toolkit";
import accesibilityReducer from "../accesibility";

export const store = configureStore({
  reducer: {
    accesibility: accesibilityReducer,
  },
});
