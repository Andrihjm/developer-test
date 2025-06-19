import { NavLink } from "react-router-dom";
import { useGetAllRoomQuery } from "../../../redux/api/room-api-slice";
import type { RooomType } from "../../../types/index.type";
import { formatDateTime } from "../../../utils/formater";
import { FaUsers } from "react-icons/fa";
import { Skeleton } from "../../ui/skeleton";

const RoomList = () => {
  const { data: rooms, isLoading: isLoadingRoom } =
    useGetAllRoomQuery(undefined);

  return (
    <div className="flex-1 overflow-y-auto">
      {isLoadingRoom ? (
        <Skeleton type="lots" />
      ) : (
        <div>
          {rooms.data.map((room: RooomType, index: number) => (
            <NavLink
              key={index}
              to={`/chat-room/${room.id}`}
              className={({ isActive }) =>
                `flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 duration-200 hover:bg-[#242626] ${
                  isActive && "bg-[#242626]"
                }`
              }
            >
              <div
                className={
                  "rounded-full border border-[#3a3a3a] bg-[#242626] p-3.5 text-[#A5A5A5]"
                }
              >
                <FaUsers size={22} />
              </div>

              <div className="w-full">
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-[16px] font-light text-white">
                      {room.name}
                    </p>
                    <p className="line-clamp-1 text-sm text-[#A5A5A5]">
                      {room.messages[0]?.content ||
                        "let's say hello for the first time"}
                    </p>
                  </div>

                  <div className="absolute top-0.5 right-0 flex flex-col items-end gap-0.5 text-xs">
                    <p className="text-[#A5A5A5]">
                      {formatDateTime(room.messages[0]?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomList;
