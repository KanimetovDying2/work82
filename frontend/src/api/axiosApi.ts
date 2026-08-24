  import axios from "axios";
  import type { RootState } from "../store/store";
  import type { Store } from "@reduxjs/toolkit";

  export const axiosApi = axios.create({
    baseURL: "http://localhost:3000",
  });

  export const setupAxiosInterceptors = (store: Store<RootState>) => {
    axiosApi.interceptors.request.use((config) => {
      const state = store.getState();
      const token = state.users.token;
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    });
  };

  export default axiosApi;
