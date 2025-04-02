import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";

interface Staff {
  id: string;
  registrationDate: string; 
  role: string;
  firstName: string;
  fatherName: string;
  grandFatherName: string;
  sex: string;
  dateOfBirth: string; 
  address: string;
  houseNumber: string;
  phoneNumber: string;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;
  specialization: string;
  isTriage: boolean;
  email: string;
  isActive: boolean;
  workSchedule: string;
  profilePicture: string;
  qualifications: string;
  previousExperience: string;
  bloodGroup: string;
  isFirstLogin: boolean;
}


interface CreateStaff {
  role: string;
  firstName: string;
  fatherName: string;
  grandFatherName: string;
  sex: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;

  houseNumber?: string;
  specialization?: string;
  isTriage?: boolean;
  bloodGroup?: string;
  isActive?: boolean;
  qualifications?: string;
  previousExperience?: string;
  profilePicture?: string;
}

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as RootState).auth.accessToken ||
        localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Staff"], // 🔥 Tracks staff updates
  endpoints: (builder) => ({
    getStaffs: builder.query<Staff[], void>({
      query: () => "/staff/all",
      providesTags: ["Staff"],
    }),
    getStaffById: builder.query<Staff, string>({
      query: (id) => `/staff/${id}/single`,
      providesTags: (result, error, id) => [{ type: "Staff", id }],
    }),
    createStaff: builder.mutation<CreateStaff, Partial<CreateStaff>>({
      query: (staffData) => ({
        url: "/staff/create",
        method: "POST",
        body: staffData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled; 
          dispatch(staffApi.util.invalidateTags(["Staff"]));
        } catch (error) {
          console.error("Failed to create staff:", error);
        }
      },
    }),
    resendPassword: builder.mutation<void , string>({
      query: (id) => (`/staff/${id}/resendPassword`)
    }),
    activateAccount: builder.mutation<void, string>({
      query: (id) => `/staff/${id}/activate`,
      invalidatesTags: (result, error, id) => [
        { type: 'Staff', id },
        { type: 'Staff' } // Also invalidate the list
      ]
    }),
    deactivateAccount: builder.mutation<void, string>({
      query: (id) => `/staff/${id}/deactivate`,
      invalidatesTags: (result, error, id) => [
        { type: 'Staff', id },
        { type: 'Staff' } // Also invalidate the list
      ]
    })
  }),
});

export const { useGetStaffsQuery, useCreateStaffMutation , useGetStaffByIdQuery , useResendPasswordMutation,useActivateAccountMutation , useDeactivateAccountMutation } = staffApi;
