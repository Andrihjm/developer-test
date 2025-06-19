import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_SOCKET_URL ??
    "https://api-chat-app-production-14a5.up.railway.app",
  {
    transports: ["websocket"],
    auth: {
      token: localStorage.getItem("access_token"),
    },
  },
);
