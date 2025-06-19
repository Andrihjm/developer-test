import { NavLink } from "react-router-dom";
import {
  useGetProfileQuery,
  useGetUsersQuery,
} from "../../../redux/api/user-api-slice";
import type { UserType } from "../../../types/index.type";
import { formatDateTime } from "../../../utils/formater";
import { FaUserLarge } from "react-icons/fa6";
import { IoCheckmarkDone } from "react-icons/io5";
import { Skeleton } from "../../ui/skeleton";

const ChatList = () => {
  const { data: users = [], isLoading } = useGetUsersQuery(undefined);
  const { data: profile } = useGetProfileQuery(undefined);

  const currentUserId = profile?.data?.id;

  if (isLoading) return <Skeleton type="lots" />;

  return (
    <div className="flex-1 overflow-y-auto">
      {users.map((chat: UserType) => {
        if (chat.id === currentUserId) return null;

        const latestMessage =
          chat.messages && chat.messages.length > 0
            ? chat.messages[chat.messages.length - 1]
            : undefined;

        return (
          <div key={chat.id}>
            <NavLink
              to={`/message/${chat.id}`}
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
                <FaUserLarge size={20} />
              </div>

              <div className="relative w-full leading-5">
                <p className="text-[16px] font-light text-white">
                  {chat.username}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <IoCheckmarkDone size={19} className="text-blue-400" />
                    <p className="line-clamp-1 text-sm text-[#A5A5A5]">
                      {latestMessage?.content ?? "No message"}
                    </p>
                  </div>

                  {latestMessage && (
                    <div className="absolute top-0.5 right-0 flex flex-col items-end gap-0.5 text-xs">
                      <p className="text-[#A5A5A5]">
                        {formatDateTime(latestMessage.createdAt)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
