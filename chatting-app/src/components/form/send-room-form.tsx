import { LoaderCircle, Plus, SendHorizontal, Sticker } from "lucide-react";
import { useSendMessageInRoomMutation } from "../../redux/api/message-api-slice";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SendRoomForm = () => {
  const [message, setMessage] = useState("");
  const { id: roomId } = useParams<{ id: string }>();

  const [sendMessageInRoom, { isLoading }] = useSendMessageInRoomMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId || message.trim() === "") return;

    try {
      await sendMessageInRoom({
        roomId,
        content: message,
      }).unwrap();
      setMessage("");
    } catch (err) {
      console.error("error send room message", err);
    }
  };

  const isDisabled = !roomId || isLoading || message.trim() === "";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 p-4"
    >
      <div className="flex w-full items-center gap-4 rounded-full bg-[#242626] px-4 py-2.5 text-[#FAFAFA]">
        <Plus size={26} className="cursor-pointer" />
        <Sticker size={26} className="cursor-pointer" />

        <input
          type="text"
          placeholder="Type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-transparent outline-none placeholder:text-[#b8b8b8]"
        />

        <button
          type="submit"
          disabled={isDisabled}
          className={
            isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <SendHorizontal
              size={26}
              className={isDisabled ? "text-[#A5A5A5]" : "text-[#FAFAFA]"}
            />
          )}
        </button>
      </div>
    </form>
  );
};

export default SendRoomForm;
