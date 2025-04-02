import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../../services/baseQuery";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Staff{
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
    profilePicture: string
  }


export interface LoginResponse {
  staff: Staff;
  access_token: string;
  refreshToken: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    refreshToken: builder.mutation<LoginResponse, string>({
      query: (refreshToken) => ({
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshTokenMutation } = authApi;
