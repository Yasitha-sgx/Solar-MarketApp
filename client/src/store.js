import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { userApiSlice } from "./slices/userApiSlice";
import { requestApiSlice } from "./slices/requestApiSlice";

const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [requestApiSlice.reducerPath]: requestApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApiSlice.middleware,
      requestApiSlice.middleware
    ),
  devTools: true,
});

export default store;
