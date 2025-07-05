import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../services/message/message.service';
import { CreateMessageRequestDto } from 'src/domain/dto/request/create-message.request.dto';
import { forwardRef, Inject } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => MessageService))
    private readonly messageService: MessageService,
  ) {}

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    void client.join(roomId);
    console.log(`Socket ${client.id} joined room ${roomId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: CreateMessageRequestDto & { recipientId?: string },
  ) {
    const senderId = client.data.userId;
    if (!senderId) return;
    console.log(senderId)

    let roomId: string;
    let savedMessage: any;

    if (data.roomId) {
      savedMessage = await this.messageService.createMessage({
        roomId: data.roomId,
        senderId,
        content: data.content,
      });
      roomId = data.roomId;
    } else if (data.recipientId) {
      savedMessage = await this.messageService.sendPrivateMessage(
        senderId,
        data.recipientId,
        data.content,
      );
      roomId = savedMessage.roomId;
    } else {
      return;
    }

    this.server.to(roomId).emit('receive_message', savedMessage);
  }
}
