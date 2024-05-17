import { PATIENTS_URL, UPLOAD_URL, OLD_PATIENTS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const patientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPatients: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: `${PATIENTS_URL}/`,

        params: { pageNumber, keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Patients"],
    }),
    sortAllPatientsByLastName: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: `${PATIENTS_URL}/sortPatient`,
        params: { pageNumber, keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Patients"],
    }),
    getPatientById: builder.query({
      query: (patientId) => ({
        url: `${PATIENTS_URL}/onePatient/${patientId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPatient: builder.mutation({
      query: (data) => ({
        url: `${PATIENTS_URL}/createPatient`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Patient"],
    }),
    updatePatient: builder.mutation({
      query: (data) => ({
        url: `${PATIENTS_URL}/updatePatient/${data.patientId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Patient"],
    }),
    uploadSignature: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/signatureImage`,
        method: "POST",
        body: data,
      }),
    }),
    uploadConsentSignature: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/consentSignature`,
        method: "POST",
        body: data,
      }),
    }),
    uploadDentistSignature: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/dentistSignature`,
        method: "POST",
        body: data,
      }),
    }),
    uploadDataPrivacySignature: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/dataPrivacySignature`,
        method: "POST",
        body: data,
      }),
    }),
    createProcedure: builder.mutation({
      query: (data) => ({
        url: `${PATIENTS_URL}/createProcedure/${data.patientId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Patient"],
    }),
    uploadRx: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/rx`,
        method: "POST",
        body: data,
      }),
    }),
    getProcedure: builder.query({
      query: ({ patientId, procedureId }) => ({
        url: `${PATIENTS_URL}/patientProcedure/${patientId}/procedures/${procedureId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Patient"],
    }),
    getAllProcedures: builder.query({
      query: () => ({
        url: `${PATIENTS_URL}/allProcedures`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Patients"],
    }),
    uploadProcedureSignature: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/procedureSignature`,
        method: "POST",
        body: data,
      }),
    }),
    createDentalChartKids: builder.mutation({
      query: (data) => ({
        url: `${PATIENTS_URL}/dentalChartKids/${data.patientId}`,
        method: "POST",
        body: data,
      }),
    }),
    getDentalChartKids: builder.query({
      query: ({ patientId, dentalChartId }) => ({
        url: `${PATIENTS_URL}/dentalChartKids/${patientId}/get/${dentalChartId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Patient"],
    }),
    updateDentalChartKids: builder.mutation({
      query: (data) => ({
        url: `${PATIENTS_URL}/dentalChartKids/update/${data.patientId}`,
        method: "PUT",
        body: data,
      }),
    }),
    createDentalChartAdult: builder.mutation({
      query: (data) => ({
        url: `${PATIENTS_URL}/dentalChartAdult/${data.patientId}`,
        method: "POST",
        body: data,
      }),
    }),
    updateDentalChartAdult: builder.mutation({
      query: (data) => ({
        url: `${PATIENTS_URL}/dentalChartAdult/update/${data.patientId}`,
        method: "PUT",
        body: data,
      }),
    }),
    getDentalChartAdult: builder.query({
      query: ({ patientId, dentalChartId }) => ({
        url: `${PATIENTS_URL}/dentalChartAdult/${patientId}/get/${dentalChartId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Patient"],
    }),
    changeProcedureStatus: builder.mutation({
      query: (data) => ({
        url: `${PATIENTS_URL}/changeStatus/${data.patientId}/procedure/${data.procedureId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deletePatient: builder.mutation({
      query: ({ patientId }) => ({
        url: `${PATIENTS_URL}/deletePatient/${patientId}`,
        method: "DELETE",
      }),
    }),

    //---------------- OLD PATIENT RECORDS
    getAllOldPatients: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: `${OLD_PATIENTS_URL}/`,

        params: { pageNumber, keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["OldPatients"],
    }),
    getOldPatientById: builder.query({
      query: (patientId) => ({
        url: `${OLD_PATIENTS_URL}/onePatient/${patientId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    sortAllOldPatientsByLastName: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: `${OLD_PATIENTS_URL}/sortPatient`,
        params: { pageNumber, keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["OldPatients"],
    }),
    deleteOldPatient: builder.mutation({
      query: ({ patientId }) => ({
        url: `${OLD_PATIENTS_URL}/deletePatient/${patientId}`,
        method: "DELETE",
      }),
    }),
    createOldPatient: builder.mutation({
      query: (data) => ({
        url: `${OLD_PATIENTS_URL}/createPatient`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OldPatient"],
    }),
    createOldProcedure: builder.mutation({
      query: (data) => ({
        url: `${OLD_PATIENTS_URL}/createProcedure/${data.patientId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OldPatient"],
    }),
    getAllOldProcedures: builder.query({
      query: () => ({
        url: `${OLD_PATIENTS_URL}/allProcedures`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["OldPatients"],
    }),
    changeOldProcedureStatus: builder.mutation({
      query: (data) => ({
        url: `${OLD_PATIENTS_URL}/changeStatus/${data.patientId}/procedure/${data.procedureId}`,
        method: "PUT",
        body: data,
      }),
    }),
    getOldProcedure: builder.query({
      query: ({ patientId, procedureId }) => ({
        url: `${OLD_PATIENTS_URL}/patientProcedure/${patientId}/procedures/${procedureId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["OldPatient"],
    }),
  }),
});

export const {
  useGetAllPatientsQuery,
  useGetPatientByIdQuery,
  useCreatePatientMutation,
  useUploadSignatureMutation,
  useUpdatePatientMutation,
  useUploadConsentSignatureMutation,
  useUploadDentistSignatureMutation,
  useUploadDataPrivacySignatureMutation,
  useCreateProcedureMutation,
  useGetProcedureQuery,
  useUploadRxMutation,
  useUploadProcedureSignatureMutation,
  useCreateDentalChartKidsMutation,
  useGetAllProceduresQuery,
  useGetDentalChartKidsQuery,
  useUpdateDentalChartKidsMutation,
  useCreateDentalChartAdultMutation,
  useUpdateDentalChartAdultMutation,
  useGetDentalChartAdultQuery,
  useChangeProcedureStatusMutation,
  useDeletePatientMutation,
  useSortAllPatientsByLastNameQuery,
  // old patient records
  useGetAllOldPatientsQuery,
  useSortAllOldPatientsByLastNameQuery,
  useDeleteOldPatientMutation,
  useCreateOldPatientMutation,
  useCreateOldProcedureMutation,
  useGetOldPatientByIdQuery,
  useGetAllOldProceduresQuery,
  useChangeOldProcedureStatusMutation,
  useGetOldProcedureQuery,
} = patientsApiSlice;
