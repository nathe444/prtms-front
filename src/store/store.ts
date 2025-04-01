import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/auth/authApi";
import authReducer from "./apis/auth/authSlice";
import { staffApi } from "./apis/staff/staffApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [staffApi.reducerPath]: staffApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(staffApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// "email": "realdavis7779@gmail.com",
//     "password":"b9b8c3fa741f"