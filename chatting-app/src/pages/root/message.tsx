import { EllipsisVertical, MessageSquarePlus } from "lucide-react";
import SearchChat from "../../components/shared/search-chat";
import TypeList from "../../components/shared/lists/type-list";
import { Link } from "react-router-dom";

const Message = () => {
  return (
    <div className="flex h-screen w-[28%] flex-col gap-2 border-r border-[#242626] bg-[#161717] p-5">
      <div className="flex items-center justify-between pb-2">
        <Link to="/" className="text-2xl font-extrabold text-white">
          ChattingApp
        </Link>

        <div className="flex items-center gap-2 text-white">
          <MessageSquarePlus size={21} className="cursor-pointer" />
          <EllipsisVertical size={21} className="cursor-pointer" />
        </div>
      </div>

      <SearchChat />

      <TypeList />
    </div>
  );
};

export default Message;
