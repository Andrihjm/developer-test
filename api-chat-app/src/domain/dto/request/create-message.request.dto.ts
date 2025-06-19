export class CreateMessageRequestDto {
  roomId: string;
  senderId: string;
  recipientId?: string;
  content: string;
}

export class CreateMessageBodyDto {
  content: string;
}
