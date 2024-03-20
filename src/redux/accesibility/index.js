import { createSlice } from "@reduxjs/toolkit";

export const accesibilitySlice = createSlice({
  name: "accesibility",
  initialState: {
    headingSize: 38,
    paragraphSize: 26,
    textSize: 18,
    grayscale: 0,
    invert: 0,
  },
  reducers: {
    changeFontSize: (state, action) => {
      state.headingSize = 35 + +action.payload;
      state.paragraphSize = 25 + +action.payload;
      state.textSize = 18 + +action.payload;
    },
    changeColorGrayscale: (state) => {
      state.invert = 0;
      state.grayscale = 1;
    },
    changeColorInvert: (state) => {
      state.grayscale = 0;
      state.invert = 1;
    },
    resetColor: (state) => {
      state.invert = 0;
      state.grayscale = 0;
    },
  },
});

export const {
  resetColor,
  changeFontSize,
  changeColorInvert,
  changeColorGrayscale,
} = accesibilitySlice.actions;

export default accesibilitySlice.reducer;
