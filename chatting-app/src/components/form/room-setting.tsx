import { useParams } from "react-router-dom";
import {
  useEditMessageMutation,
  useEditNameRoomMutation,
} from "../../redux/api/room-api-slice";
import Button from "../ui/button";
import React, { useState } from "react";

interface RoomSettingProps {
  type: "room" | "message";
  onDelete: () => void;
  onClose: () => void;
}

const RoomSetting = ({ type, onDelete, onClose }: RoomSettingProps) => {
  const [name, setName] = useState("");
  const [messageId, setMessageId] = useState("");
  const [newContent, setnNewContent] = useState("");
  console.log(setMessageId);

  const isFormValid = name.trim() !== "";

  const { id } = useParams<{ id: string }>();
  const roomId = id ?? null;

  const [editNameRoom] = useEditNameRoomMutation();
  const [editMessage] = useEditMessageMutation();

  const onChangeRoomName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId) {
      console.error("No roomId in route params");
      return;
    }

    try {
      if (type === "room") {
        await editNameRoom({
          roomId,
          name,
        }).unwrap();
        setName("");
      } else {
        await editMessage({
          id: messageId,
          content: newContent,
        }).unwrap();
      }
      onClose();
    } catch (error) {
      console.log("update error", error);
    }
  };

  return (
    <form onSubmit={onChangeRoomName} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Room name"
        value={type === "room" ? name : newContent}
        onChange={
          type === "room"
            ? (e) => setName(e.target.value)
            : (e) => setnNewContent(e.target.value)
        }
        className="w-full rounded-lg border border-[#242626] bg-transparent px-2 py-2 text-sm outline-0"
      />

      <div className="flex w-full items-center justify-end gap-2">
        <Button
          type="button"
          className="bg-red-500/80 text-[#FAFAFA] transition-colors duration-200 hover:bg-red-500/70"
          onClick={onDelete}
        >
          Delete
        </Button>
        <Button
          type="submit"
          className={`bg-[#242626] ${!isFormValid ? "!cursor-not-allowed text-[#A5A5A5]" : "text-[#FAFAFA]"}`}
        >
          Rename
        </Button>
      </div>
    </form>
  );
};

export default RoomSetting;
