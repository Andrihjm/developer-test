import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteRoomMutation,
  useGetAllRoomQuery,
} from "../../../redux/api/room-api-slice";
import { useGetProfileQuery } from "../../../redux/api/user-api-slice";
import type { RoomType } from "../../../types/index.type";
import { useState } from "react";
import Modal from "../../modal/modal";
import AddUserInRoom from "../add-user-in-room";
import { EllipsisVertical, Search } from "lucide-react";
import { FaUsers } from "react-icons/fa";
import RoomSetting from "../../form/room-setting";

const HeaderChatRoom = () => {
  const [isOpenModalRoom, setIsOpenModalRoom] = useState(false);
  const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);

  const { id: roomId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: roomsResp, isLoading } = useGetAllRoomQuery(undefined);
  const { data: user } = useGetProfileQuery(undefined);
  const [deleteRoom] = useDeleteRoomMutation();

  const currentRoom = (roomsResp?.data as RoomType[] | undefined)?.find(
    (room) => room.id === roomId,
  );

  const currentUserId = user?.data?.id;

  if (!currentRoom) {
    return <p className="p-4 text-sm text-gray-500">Loading...</p>;
  }

  const participantsLabel =
    currentRoom.participants.length > 0
      ? currentRoom.participants
          .map((p) => (p.user.id === currentUserId ? "You" : p.user.username))
          .join(", ")
      : "No participants";

  const handleDeveteRoom = async () => {
    try {
      await deleteRoom(roomId!).unwrap();
      navigate("/");
    } catch (error) {
      console.log("error delete room", error);
    }
  };

  const handleOpenModal = () => {
    setIsOpenModalRoom(!isOpenModalRoom);
  };

  const handleOpenSettingModal = () => {
    setIsOpenSettingModal(!isOpenSettingModal);
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-[#242626] bg-[#161717] px-4 py-3">
        <div
          onClick={handleOpenModal}
          className="flex cursor-pointer items-center gap-1.5"
        >
          <div
            className={
              "rounded-full border border-[#3a3a3a] bg-[#242626] p-2.5 text-[#A5A5A5]"
            }
          >
            <FaUsers size={22} />
          </div>

          <div>
            <p className="line-clamp-1 text-[16px] font-light text-white">
              {currentRoom.name ?? "Unnamed room"}
            </p>
            <p className="line-clamp-1 text-xs text-[#A5A5A5]">
              {isLoading || !currentRoom ? "Loading..." : participantsLabel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[#A5A5A5]">
          <Search size={20} className="cursor-pointer" />
          <EllipsisVertical
            onClick={handleOpenSettingModal}
            size={20}
            className="cursor-pointer"
          />
        </div>
      </div>

      {isOpenModalRoom && (
        <Modal onClose={() => setIsOpenModalRoom(false)} title="Add User">
          <AddUserInRoom
            roomId={roomId as string}
            onCancel={() => setIsOpenModalRoom(false)}
          />
        </Modal>
      )}

      {isOpenSettingModal && (
        <Modal
          onClose={() => setIsOpenSettingModal(false)}
          title="Settings Room"
        >
          <RoomSetting
            type="room"
            onDelete={handleDeveteRoom}
            onClose={() => setIsOpenSettingModal(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default HeaderChatRoom;
