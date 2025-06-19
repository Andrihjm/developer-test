import { useParams } from "react-router-dom";
import {
  useGetProfileQuery,
  useGetUserByIdQuery,
} from "../../../redux/api/user-api-slice";
import HeaderChat from "../../../components/shared/room-chat/header-chat";
import { useGetMessageUserQuery } from "../../../redux/api/message-api-slice";
import ChatContent from "../../../components/shared/room-chat/chat-content";
import type { UserMessageType } from "../../../types/index.type";
import { formatTime } from "../../../utils/formater";
import SendMessageForm from "../../../components/form/send-message-form";
import { useEffect, useRef } from "react";

const RoomMessage = () => {
  const { id } = useParams();
  const { data: user } = useGetUserByIdQuery(id!);
  const { data: chatUser = [] } = useGetMessageUserQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });
  const { data: profile } = useGetProfileQuery(id!);

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatUser]);

  if (!user) return null;

  return (
    <>
      <main className="flex h-full flex-col">
        <HeaderChat username={user.username} />

        <div className="bg-image flex-1 overflow-y-auto pt-2">
          {chatUser?.map((chat: UserMessageType) => {
            const me = chat?.sender?.id === profile?.data?.id;

            return (
              <ChatContent
                key={chat.id}
                // sender={!same ? chat?.sender?.username : undefined}
                message={chat?.content}
                sent={formatTime(chat?.createdAt)}
                typeSide={me ? "right" : "left"}
              />
            );
          })}
          <div ref={bottomRef} />
        </div>

        <SendMessageForm />
      </main>
    </>
  );
};

export default RoomMessage;
