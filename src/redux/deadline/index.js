import { createSlice } from "@reduxjs/toolkit";

export const deadlineSlice = createSlice({
  name: "deadline",
  initialState: {
    passed: false,
  },
  reducers: {
    changeDeadlineStatus: (state, action) => {
      state.passed = action.payload;
    },
  },
});

export const { changeDeadlineStatus } = deadlineSlice.actions;

export default deadlineSlice.reducer;
