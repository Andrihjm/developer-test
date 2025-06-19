import type { MessageType, UserMessageType } from "../../types/index.type";
import { BASE_URL } from "../constants";
import { apiSlice } from "./api-slice";
import type { RootState } from "../store";
import type {
  SendMessageInRoomReduxType,
  SendMessageUserReduxType,
} from "../../types/redux.type";
import { socket } from "../../lib/socket";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessageUser: builder.query<UserMessageType[], string>({
      query: (userId) => `${BASE_URL}/api/v1/message/dm/${userId}`,

      async onCacheEntryAdded(
        userId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState },
      ) {
        await cacheDataLoaded;

        const meId = (getState() as RootState).auth.userInfo?.user.id;
        if (!meId) return;

        const roomId = `dm_${[meId, userId].sort().join("-")}`;
        socket.emit("joinRoom", roomId);

        const listener = (msg: UserMessageType) => {
          updateCachedData((draft) => {
            draft.push(msg);
          });
        };

        socket.on("receive_message", listener);

        await cacheEntryRemoved;
        socket.off("receive_message", listener);
        socket.emit("leaveRoom", roomId);
      },
    }),

    sendMessageUser: builder.mutation({
      query: ({ userId, content }: SendMessageUserReduxType) => ({
        url: `${BASE_URL}/api/v1/message/to/${userId}`,
        method: "POST",
        body: { content },
      }),

      async onQueryStarted(
        { userId, content },
        { dispatch, queryFulfilled, getState },
      ) {
        const fakeId = crypto.randomUUID();
        const state = getState() as RootState;
        const me = state.auth.userInfo?.user;

        const patch = dispatch(
          messageApiSlice.util.updateQueryData(
            "getMessageUser",
            userId,
            (draft) => {
              (draft as UserMessageType[]).push({
                id: fakeId,
                userId,
                sender: {
                  id: me?.id ?? "me",
                  username: me?.username ?? "You",
                },
                content,
                createdAt: new Date().toISOString(),
                // senderId: "",
              });
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),

    sendMessageInRoom: builder.mutation({
      query: ({ roomId, content }: SendMessageInRoomReduxType) => ({
        url: `${BASE_URL}/api/v1/message/${roomId}`,
        method: "POST",
        body: { content },
      }),

      async onQueryStarted(
        { roomId, content },
        { dispatch, queryFulfilled, getState },
      ) {
        const fakeId = crypto.randomUUID();
        const state = getState() as RootState;
        const me = state.auth.userInfo?.user;

        const patch = dispatch(
          messageApiSlice.util.updateQueryData(
            "getMessageInRoom",
            roomId,
            (draft) => {
              (draft as MessageType[]).push({
                id: fakeId,
                roomId,
                sender: {
                  id: me?.id ?? "me",
                  username: me?.username ?? "You",
                },
                content,
                createdAt: new Date().toISOString(),
                // senderId: "",
              });
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),

    getMessageInRoom: builder.query<MessageType[], string>({
      query: (roomId) => `${BASE_URL}/api/v1/message/${roomId}`,

      async onCacheEntryAdded(
        roomId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        await cacheDataLoaded;

        socket.emit("joinRoom", roomId);

        const listener = (msg: MessageType) => {
          if (msg.roomId !== roomId) return;
          updateCachedData((draft) => {
            draft.push(msg);
          });
        };

        socket.on("receive_message", listener);

        socket.on("receive_message", (msg) => {
          console.log("🔥 DM received", msg);
        });

        await cacheEntryRemoved;
        socket.off("receive_message", listener);
        socket.emit("leaveRoom", roomId);
      },
    }),
  }),
});

export const {
  useSendMessageUserMutation,
  useGetMessageUserQuery,
  useGetMessageInRoomQuery,
  useSendMessageInRoomMutation,
} = messageApiSlice;
