import { EllipsisVertical, Search } from "lucide-react";
import { useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import Modal from "../../modal/modal";

interface HeaderChatProps {
  username: string;
}

const HeaderChat = ({ username }: HeaderChatProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div className="flex items-center justify-between border-b border-[#2E2F2F] bg-[#161717] px-4 py-3">
      <div className="flex items-center gap-3">
        <div
          className={
            "rounded-full border border-[#3a3a3a] bg-[#242626] p-2.5 text-[#A5A5A5]"
          }
        >
          <FaUserLarge size={18} />
        </div>

        <div>
          <p className="text-[16px] font-light text-white">{username}</p>
          <p className="text-xs text-[#A5A5A5]">Online</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-[#A5A5A5]">
        <Search size={20} className="cursor-pointer" />
        <EllipsisVertical
          size={20}
          onClick={handleOpenModal}
          className="cursor-pointer"
        />

        {isOpenModal && (
          <Modal onClose={() => setIsOpenModal(false)} title="Settings user">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores,
            illum nam, molestias laudantium neque deserunt sed, temporibus
            adipisci saepe perspiciatis laborum consequatur eos? Ullam impedit,
            consectetur eaque labore nulla ipsam!
          </Modal>
        )}
      </div>
    </div>
  );
};

export default HeaderChat;
