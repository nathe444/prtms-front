import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { setUser, clearUser } from "./authSlice";

export interface LoginResponse {
  access_token: string;
  refreshToken:string;
  staff:{
    role: string;
    firstName: string;
    fatherName: string;
    grandFatherName: string;
    sex: string;
    email: string;
    dateOfBirth: string;
    phoneNumber: string;
    address: string;
    houseNumber: string;
    emergencyContactName: string;
    emergencyContactPhoneNumber: string;
    specialization: string;
    isTriage: boolean;
    bloodGroup: string;
    isActive: boolean;
    qualifications: string;
    previousExperience: string;
    profilePicture: string;
    workSchedule: string;
    isFirstLogin:boolean;
  }
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken || localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // localStorage.setItem("token", data.access_token);
          // localStorage.setItem("refreshToken", data.refreshToken);
          dispatch(setUser(data));
        } catch (error) {
          console.error("Login failed", error);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch }) {
        localStorage.removeItem("token");
        dispatch(clearUser());
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
