import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import Modal from "../modal/modal";
import RoomSetting from "../form/room-setting";

const OptionMessageSetting = () => {
  const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenSettingModal(!isOpenSettingModal);
  };

  return (
    <div className="hidden group-hover:block">
      <div className="flex items-center gap-2 rounded-md bg-[#292a2a42] px-2 py-1.5 text-[#a5a5a5b9]">
        <button className="hover:cursor-pointer hover:text-[#FAFAFA]">
          <Trash size={14} />
        </button>
        <button
          onClick={handleOpenModal}
          className="hover:cursor-pointer hover:text-[#FAFAFA]"
        >
          <Pencil size={14} />
        </button>
      </div>

      {isOpenSettingModal && (
        <Modal onClose={() => setIsOpenSettingModal(false)}>
          <RoomSetting
            type="message"
            onDelete={() => {}}
            onClose={() => setIsOpenSettingModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default OptionMessageSetting;
