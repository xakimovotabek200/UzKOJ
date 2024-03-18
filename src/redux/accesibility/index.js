import { createSlice } from "@reduxjs/toolkit";

export const accesibilitySlice = createSlice({
  name: "accesibility",
  initialState: {
    headingSize: 35,
    paragraphSize: 25,
    textSize: 18,
  },
  reducers: {
    changeFontSize: (state, action) => {
      state.headingSize = 35 + +action.payload;
      state.paragraphSize = 25 + +action.payload;
      state.textSize = 18 + +action.payload;
    },
  },
});

export const { changeFontSize } = accesibilitySlice.actions;

export default accesibilitySlice.reducer;
