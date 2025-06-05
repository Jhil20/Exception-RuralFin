import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "../slices/loadingSlice";
import signInReducer from "../slices/isSignInSlice";
import socketReducer from "../slices/socketSlice";
const store = configureStore({
  reducer: {
    loading:loadingReducer,
    signin:signInReducer,
    socket:socketReducer,
  },
});

export default store;
