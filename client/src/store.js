import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { userApiSlice } from "./slices/userApiSlice";
import { requestApiSlice } from "./slices/requestApiSlice";
import { offerApiSlice } from "./slices/offerApiSlice";

const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [requestApiSlice.reducerPath]: requestApiSlice.reducer,
    [offerApiSlice.reducerPath]: offerApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApiSlice.middleware,
      requestApiSlice.middleware,
      offerApiSlice.middleware
    ),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
