export class CreateRoomRequestDto {
  name?: string;
  userIds: string[];
}

export class EditRoomNameRequestDto {
  roomId: string;
  name: string;
}
