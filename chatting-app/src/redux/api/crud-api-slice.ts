import { BASE_URL } from "../constants";
import { apiSlice } from "./api-slice";

export const crudApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPOST: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/v1/crud`,
        method: "POST",
        body: data,
      }),
    }),
    editPUT: builder.mutation({
      query: ({ id, content }) => ({
        url: `${BASE_URL}/api/v1/crud/${id}`,
        method: "PUT",
        body: { content },
      }),
    }),
    getGET: builder.query({
      query: () => ({
        url: `${BASE_URL}/api/v1/crud`,
        method: "GET",
      }),
    }),
    deleteDEL: builder.mutation({
      query: (roomId: string) => ({
        url: `${BASE_URL}/api/v1/room/delete/${roomId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Room"],
    }),
  }),
});

export const {
  useCreatePOSTMutation,
  useEditPUTMutation,
  useGetGETQuery,
  useDeleteDELMutation,
} = crudApiSlice;
