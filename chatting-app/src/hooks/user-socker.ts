import { io } from "socket.io-client";

const URL =
  import.meta.env.VITE_SOCKET_URL ||
  "https://api-chat-app-production-14a5.up.railway.app";
export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
});
