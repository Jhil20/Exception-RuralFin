import { createSlice } from "@reduxjs/toolkit";

const signInSlice = createSlice({
  name: "signin",
  initialState: { isSignedIn: false },
  reducers: {
    SignedIn: (state) => {
      state.isLoading = true;
    },
    NotSignedIn: (state) => {
      state.isLoading = false;
    },
  },
});

export const { SignedIn, NotSignedIn } = signInSlice.actions;
export default signInSlice.reducer;
