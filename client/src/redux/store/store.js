import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "../slices/loadingSlice";
import signInReducer from "../slices/isSignInSlice";
const store = configureStore({
  reducer: {
    loading:loadingReducer,
    signin:signInReducer,
  },
});

export default store;
