import { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { addMessage, setRoomMessages } from "../redux/feature/chat-feature";
import { socket } from "../lib/socket";
import type { MessageType } from "../types/index.type";
import type { RootState } from "../redux/store";
import { useGetMessageInRoomQuery } from "../redux/api/message-api-slice";
import { useAppDispatch } from "./use-redux";

export const useRoomMessages = (roomId?: string) => {
  const dispatch = useAppDispatch();

  /* ---------- 1. Fetch pesan awal hanya jika roomId valid ---------- */
  const skip = !roomId;
  const { data: initialMessages } = useGetMessageInRoomQuery(roomId as string, {
    skip,
  });

  useEffect(() => {
    if (roomId && initialMessages) {
      dispatch(setRoomMessages({ roomId, msgs: initialMessages }));
    }
  }, [initialMessages, roomId, dispatch]);

  /* ---------- 2. Real‑time listener dengan join & leave yang bersih ---------- */
  const handlerRef = useRef<(msg: MessageType) => void>(() => {});

  useEffect(() => {
    if (!roomId) return;

    // keluar dari room lama sebelum join baru
    const prevHandler = handlerRef.current;
    if (prevHandler) socket.off("message", prevHandler);

    socket.emit("joinRoom", roomId);

    const handleSocketMsg = (msg: MessageType) => {
      // jaga‑jaga kalau backend meng‑broadcast ke semua
      if (msg.roomId === roomId) dispatch(addMessage(msg));
    };

    handlerRef.current = handleSocketMsg;
    socket.on("message", handleSocketMsg);

    return () => {
      socket.emit("leaveRoom", roomId); // beri tahu server
      socket.off("message", handleSocketMsg); // bersihkan listener
    };
  }, [roomId, dispatch]);

  /* ---------- 3. Selector dinamis, meminimkan re‑render ---------- */
  const selectRoom = useMemo(
    () => (s: RootState) => (roomId ? (s.chat[roomId] ?? []) : []),
    [roomId],
  );

  return useSelector(selectRoom);
};
