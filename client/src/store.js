import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { userApiSlice } from "./slices/userApiSlice";
import { requestApiSlice } from "./slices/requestApiSlice";
import { offerApiSlice } from "./slices/offerApiSlice";
import { blogApiSlice } from "./slices/blogApiSlice";

const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [requestApiSlice.reducerPath]: requestApiSlice.reducer,
    [offerApiSlice.reducerPath]: offerApiSlice.reducer,
    [blogApiSlice.reducerPath]: blogApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApiSlice.middleware,
      requestApiSlice.middleware,
      offerApiSlice.middleware,
      blogApiSlice.middleware
    ),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
