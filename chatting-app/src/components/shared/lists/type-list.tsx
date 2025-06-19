import { useState } from "react";
import Button from "../../ui/button";
import { Plus } from "lucide-react";
import Modal from "../../modal/modal";
import CreateRoomForm from "../../form/create-room-form";
import ChatList from "./chat-list";
import RoomList from "./room-list";
import Read from "../../../pages/root/read";
import Favorit from "../../../pages/root/favorit";

interface TypeListProps {
  type?: "chat" | "group" | "read" | "favorit";
}

const TypeList = () => {
  const [activeTab, setActiveTab] = useState<
    "chat" | "group" | "read" | "favorit"
  >("chat");
  const [isOpenModalRoom, setIsOpenModalRoom] = useState(false);

  const handleTabsChat = (type: TypeListProps["type"]) => {
    if (type === "chat") {
      setActiveTab("chat");
    } else if (type === "group") {
      setActiveTab("group");
    } else if (type === "read") {
      setActiveTab("read");
    } else if (type === "favorit") {
      setActiveTab("favorit");
    }
  };

  const handleOpemModalRoom = () => {
    setIsOpenModalRoom(!isOpenModalRoom);
  };

  return (
    <>
      <div className="flex items-center gap-2 pb-2">
        <Button
          onClick={() => handleTabsChat("chat")}
          className={`!rounded-full border !py-1 text-sm ${
            activeTab === "chat"
              ? "border-[#D9FDD3]/20 bg-[#103529] text-[#D9FDD3]"
              : "border border-[#242626] text-[#A5A5A5]"
          }`}
        >
          Chat
        </Button>

        <Button
          onClick={() => handleTabsChat("read")}
          className={`min-w-max !rounded-full border !py-1 text-sm ${
            activeTab === "read"
              ? "border-[#D9FDD3]/20 bg-[#103529] text-[#D9FDD3]"
              : "border border-[#242626] text-[#A5A5A5]"
          }`}
        >
          Belum dibaca
        </Button>

        <Button
          onClick={() => handleTabsChat("favorit")}
          className={`!rounded-full border !py-1 text-sm ${
            activeTab === "favorit"
              ? "border-[#D9FDD3]/20 bg-[#103529] text-[#D9FDD3]"
              : "border border-[#242626] text-[#A5A5A5]"
          }`}
        >
          Favorit
        </Button>

        <div className="flex w-full items-center justify-between">
          <Button
            onClick={() => handleTabsChat("group")}
            className={`!rounded-full border !py-1 text-sm ${
              activeTab === "group"
                ? "border-[#D9FDD3]/20 bg-[#103529] text-[#D9FDD3]"
                : "border border-[#242626] text-[#A5A5A5]"
            }`}
          >
            Group
          </Button>

          {activeTab === "group" && (
            <button
              onClick={handleOpemModalRoom}
              className="cursor-pointer text-[#A5A5A5]"
            >
              <Plus size={20} />
            </button>
          )}

          {isOpenModalRoom && (
            <Modal
              onClose={() => setIsOpenModalRoom(false)}
              title="Create Room"
            >
              <CreateRoomForm
                onCancel={() => setIsOpenModalRoom(false)}
                onSuccess={() => setIsOpenModalRoom(false)}
              />
            </Modal>
          )}
        </div>
      </div>

      {activeTab === "chat" && <ChatList />}
      {activeTab === "group" && <RoomList />}
      {activeTab === "read" && <Read />}
      {activeTab === "favorit" && <Favorit />}
    </>
  );
};

export default TypeList;
