import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import axiosApi from "../api/axiosApi";
import type {
  User,
  LoginMutation,
  RegisterMutation,
  ValidationError,
} from "../types";

interface UsersState {
  user: User | null;
  token: string | null;
  loginLoading: boolean;
  loginError: ValidationError | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
}

const initialState: UsersState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  loginLoading: false,
  loginError: null,
  registerLoading: false,
  registerError: null,
};

export const registerUser = createAsyncThunk<
  User,
  RegisterMutation,
  { rejectValue: ValidationError }
>("users/register", async (registerData, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<User>("/users", registerData);
    return response.data;
  } catch (e) {
    if (
      isAxiosError<ValidationError>(e) &&
      e.response &&
      e.response.status === 400
    ) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const loginUser = createAsyncThunk<
  { user: User; token: string },
  LoginMutation,
  { rejectValue: ValidationError }
>("users/login", async (loginData, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<{
      message: string;
      token: string;
      user: User;
    }>("/users/sessions", loginData);
    return { user: response.data.user, token: response.data.token };
  } catch (e) {
    if (
      isAxiosError<ValidationError>(e) &&
      e.response &&
      e.response.status === 401
    ) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const logoutUser = createAsyncThunk("users/logout", async () => {
  await axiosApi.delete("/users/sessions");
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload || null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload || null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const usersReducer = usersSlice.reducer;
