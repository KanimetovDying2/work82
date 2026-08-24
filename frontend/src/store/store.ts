import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./usersSlice";
import { setupAxiosInterceptors } from "../api/axiosApi";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

setupAxiosInterceptors(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
