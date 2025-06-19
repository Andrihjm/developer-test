import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MessageType } from "../../types/index.type";

interface RoomState {
  [roomId: string]: MessageType[];
}

const chatSlice = createSlice({
  name: "chat",
  initialState: {} as RoomState,
  reducers: {
    setRoomMessages: (
      state,
      action: PayloadAction<{ roomId: string; msgs: MessageType[] }>,
    ) => {
      state[action.payload.roomId] = action.payload.msgs;
    },
    addMessage: (state, action: PayloadAction<MessageType>) => {
      const { roomId } = action.payload;
      (state[roomId] ??= []).push(action.payload);
    },
  },
});

export const { setRoomMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
