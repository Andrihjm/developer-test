export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
  messages?: MessageType[];
};

type RoomChatType = {
  id: number;
  name: string;
};

export type RooomType = {
  user: RoomChatType;
  id: number;
  name: string;
  messages: MessageType[];
  participants: ParticipantType[];
};

export type RoomType = {
  id: string;
  name: string;
  username: string;
  messages: MessageType[];
  participants: ParticipantType[];
};

export type MessageType = {
  id: string;
  // userId: string;
  roomId: string;
  content: string;
  sender: SenderType;
  senderId?: string;
  createdAt: string;
};

export type UserMessageType = {
  id: string;
  content: string;
  userId?: string;
  roomId?: string;
  sender: SenderType;
  senderId?: string;
  createdAt: string;
};

export type SenderType = {
  id: string;
  username: string;
};

export type ProfileType = {
  id: string;
  username: string;
};

export type ParticipantType = {
  id: string;
  joinedAt: string;
  roomId: string;
  userId: string;
  user: UserType;
};
