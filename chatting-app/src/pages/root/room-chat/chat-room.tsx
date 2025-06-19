import { useParams } from "react-router-dom";
import ChatContent from "../../../components/shared/room-chat/chat-content";
import { formatTime } from "../../../utils/formater";
import { useGetProfileQuery } from "../../../redux/api/user-api-slice";
import HeaderChatRoom from "../../../components/shared/room-chat/header-chat-room";
import SendRoomForm from "../../../components/form/send-room-form";
import { useRoomMessages } from "../../../hooks/use-room-message";
import { useEffect, useRef } from "react";

const ChatRoom = () => {
  const { id: roomId } = useParams<{ id: string }>();
  const messages = useRoomMessages(roomId!);
  const { data: user } = useGetProfileQuery(undefined);

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <>
      <main className="flex h-full flex-col">
        <HeaderChatRoom />

        <div className="bg-image h-full flex-1 overflow-y-scroll pt-2">
          {messages.map((msg, i) => {
            const prev = messages[i - 1];
            const same = prev?.sender.id === msg.sender.id;
            const me = msg.sender.id === user?.data?.id;

            return (
              <ChatContent
                key={msg.id}
                sender={!same ? msg.sender.username : undefined}
                message={msg.content}
                sent={formatTime(msg.createdAt)}
                typeSide={me ? "right" : "left"}
              />
            );
          })}
          <div ref={bottomRef} />
        </div>

        <SendRoomForm />
      </main>
    </>
  );
};
export default ChatRoom;
