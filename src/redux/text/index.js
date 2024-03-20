import { createSlice } from "@reduxjs/toolkit";

export const textSlice = createSlice({
  name: "text",
  initialState: {
    type: "latin",
  },
  reducers: {
    changeText: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { changeText } = textSlice.actions;

export default textSlice.reducer;
