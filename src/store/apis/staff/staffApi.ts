import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";

interface Staff {
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
    // Fetch all staff members
    getStaffs: builder.query<Staff[], void>({
      query: () => "/staff/all",
      providesTags: ["Staff"],
    }),

    // Create a new staff member
    createStaff: builder.mutation<Staff, Partial<Staff>>({
      query: (staffData) => ({
        url: "/staff/create",
        method: "POST",
        body: staffData,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled; // Wait for API success

          // Force a refetch of staff data
          dispatch(staffApi.util.invalidateTags(["Staff"]));
        } catch (error) {
          console.error("Failed to create staff:", error);
        }
      },
    }),
  }),
});

export const { useGetStaffsQuery, useCreateStaffMutation } = staffApi;
