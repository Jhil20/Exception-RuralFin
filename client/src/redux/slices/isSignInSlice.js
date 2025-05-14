import { createSlice } from "@reduxjs/toolkit";

const signInSlice = createSlice({
  name: "signin",
  initialState: { isSignedIn: false },
  reducers: {
    SignedIn: (state) => {
      state.isSignedIn = true;
    },
    NotSignedIn: (state) => {
      state.isSignedIn = false;
    },
  },
});

export const { SignedIn, NotSignedIn } = signInSlice.actions;
export default signInSlice.reducer;
