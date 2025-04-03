import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../../services/baseQuery";

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

interface UpdateStaff {
  role: string;
  firstName: string;
  fatherName: string;
  grandFatherName: string;
  sex: string;
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

interface ChangeFirstPassword {
  password: string;
}

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: baseQueryWithReauth, // Use the reauth base query here
  tagTypes: ["Staff"],
  endpoints: (builder) => ({
    getStaffs: builder.query<Staff[], void>({
      query: () => "/staff/all",
      providesTags: ["Staff"],
    }),
    getStaffById: builder.query<Staff, string>({
      query: (id) => `/staff/${id}/single`,
      providesTags: (_, __, id) => [{ type: "Staff", id }],
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
    updateStaff: builder.mutation<Staff, { id: string; staffData: Partial<UpdateStaff> }>({
      query: ({ id, staffData }) => ({
        url: `/staff/${id}/update`,
        method: "PATCH",
        body: staffData,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Staff', id },
        { type: 'Staff' } // Also invalidate the list
      ],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(staffApi.util.invalidateTags(['Staff']));
        } catch (error) {
          console.error('Update staff failed:', error);
        }
      }
    }),
    resendPassword: builder.mutation<void , string>({
      query: (id) => (`/staff/${id}/resendPassword`)
    }),
    activateAccount: builder.mutation<void, string>({
      query: (id) => `/staff/${id}/activate`,
      invalidatesTags: (_, __, id) => [
        { type: 'Staff', id },
        { type: 'Staff' } // Also invalidate the list
      ]
    }),
    deactivateAccount: builder.mutation<void, string>({
      query: (id) => `/staff/${id}/deactivate`,
      invalidatesTags: (_, __, id) => [
        { type: 'Staff', id },
        { type: 'Staff' } // Also invalidate the list
      ]
    }),
    changeFirstPassword : builder.mutation<void , ChangeFirstPassword>({
      query: (passwordData) => ({
        url: `/staff/change-first-Password`,
        method: "POST",
        body:passwordData,
        responseHandler: (response:any) => response.text(),
      }),
    })
  }),
});

export const { useGetStaffsQuery, useCreateStaffMutation , useGetStaffByIdQuery , useResendPasswordMutation,useActivateAccountMutation , useDeactivateAccountMutation , useUpdateStaffMutation,useChangeFirstPasswordMutation } = staffApi;
