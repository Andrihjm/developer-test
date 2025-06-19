import type {
  AddUserInRoomReduxType,
  EditNameInRoomReduxType,
} from "../../types/redux.type";
import { BASE_URL } from "../constants";
import { apiSlice } from "./api-slice";

export const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/v1/room`,
        method: "POST",
        body: data,
      }),
    }),
    addUserInRoom: builder.mutation({
      query: ({ userIds, roomId }: AddUserInRoomReduxType) => ({
        url: `${BASE_URL}/api/v1/room/${roomId}/participants`,
        method: "POST",
        body: { userIds },
      }),
      invalidatesTags: ["Room"],
    }),
    getAllRoom: builder.query({
      query: () => ({
        url: `${BASE_URL}/api/v1/room/me`,
        method: "GET",
      }),
      providesTags: ["Room"],
    }),
    deleteRoom: builder.mutation({
      query: (roomId: string) => ({
        url: `${BASE_URL}/api/v1/room/delete/${roomId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Room"],
    }),
    getMessageInRoom: builder.query({
      query: (roomId: string) => ({
        url: `${BASE_URL}/api/v1/message/room/${roomId}`,
        method: "GET",
      }),
      providesTags: ["Message"],
    }),
    editNameRoom: builder.mutation({
      query: ({ name, roomId }: EditNameInRoomReduxType) => ({
        url: `${BASE_URL}/api/v1/room/edit/${roomId}`,
        method: "PUT",
        body: { name },
      }),
    }),
    // TODO: SWITCH MESSAGE
    editMessage: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/v1/message/edit`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteMessage: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/v1/message/delete`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useGetAllRoomQuery,
  useGetMessageInRoomQuery,
  useAddUserInRoomMutation,
  useDeleteRoomMutation,
  useEditMessageMutation,
  useDeleteMessageMutation,
  useEditNameRoomMutation,
} = roomApiSlice;
