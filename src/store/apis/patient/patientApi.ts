import { baseQueryWithReauth } from "@/services/baseQuery";
import { createApi } from "@reduxjs/toolkit/query";
import { get } from "http";


interface CreatePaitent { 
    firstName:string,
    fatherName: string,
    grandFatherName:string,
    sex: string,
    dateOfBirth: string,
    address: string,
    phoneNumber: string,
    emergencyContactName?: string,
    emergencyContactPhoneNumber?: string,
    bloodGroup?: string,
    cardNumber: string
}

interface CreatePaitentResponse { 
  id: string,
  firstName:string,
  fatherName: string,
  grandFatherName:string,
  sex: string,
  dateOfBirth: string,
  address: string,
  phoneNumber: string,
  emergencyContactName: string,
  emergencyContactPhoneNumber: string,
  bloodGroup: string,
  cardNumber: string,
  isActive: boolean,
}

export const patientApi = createApi({
  reducerPath : "patientApi",
  baseQuery : baseQueryWithReauth,
  tagTypes : ['Patient'],
  endpoints : (builder)=>({
    createPatient : builder.mutation<CreatePaitentResponse , Partial<CreatePaitent>>({
      query: (patientData) => ({
        url: `/patient/create`,
        method: "POST",
        body: patientData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
           await queryFulfilled;
          dispatch(patientApi.util.invalidateTags(["Patient"]));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getPatients : builder.query<CreatePaitentResponse[], void>({
      query : ()=> "/patient/all",
      providesTags: ["Patient"], 
    }),
    getPatientById : builder.query<CreatePaitentResponse, string>({
      query : (id)=> `/patient/${id}/single`,
      providesTags: (_, __, id) => [{ type: "Patient", id }],
    }),
  })
})