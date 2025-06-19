import { Route, Routes } from "react-router-dom";
import Panggilan from "../pages/root/panggilan";
import Kamera from "../pages/root/kamera";
import Setting from "../pages/root/setting";
import Status from "../pages/root/status";
import RoomMessage from "../pages/root/room-chat/room-message";
import ChatRoom from "../pages/root/room-chat/chat-room";
import { ProtectedRoute } from "../components/shared/private-route";
import UserRoomList from "../components/shared/lists/user-room-list";
import Profile from "../pages/auth/profile";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="message/:id" element={<RoomMessage />} />
        <Route path="chat-room/:id" element={<ChatRoom />} />
        <Route path="chat-room/:id/user-room" element={<UserRoomList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="panggilan" element={<Panggilan />} />
        <Route path="kamera" element={<Kamera />} />
        <Route path="setting" element={<Setting />} />
        <Route path="status" element={<Status />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
