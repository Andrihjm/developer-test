export type AddUserInRoomReduxType = {
  userIds: string[];
  roomId: string;
};

export type SendMessageInRoomReduxType = {
  roomId: string;
  content: string;
};
export type EditNameInRoomReduxType = {
  roomId: string;
  name: string;
};

export type SendMessageUserReduxType = {
  userId: string;
  content: string;
};
