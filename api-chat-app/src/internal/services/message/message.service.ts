import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageRequestDto } from 'src/domain/dto/request/create-message.request.dto';
import { ChatGateway } from 'src/internal/gateways/chat.gateway';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { MessageHelper } from 'src/utils/helper/message';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => ChatGateway))
    private readonly gateway: ChatGateway,
    private readonly messageHelper: MessageHelper,
  ) {}

  async createMessage(dto: CreateMessageRequestDto) {
    const roomExists = await this.prisma.room.findUnique({
      where: {
        id: dto.roomId,
      },
      select: {
        id: true,
      },
    });

    if (!roomExists) {
      throw new NotFoundException('Room not found');
    }

    const saved = await this.prisma.message.create({
      data: {
        roomId: dto.roomId,
        content: dto.content,
        senderId: dto.senderId,
      },
      include: { sender: true },
    });

    this.gateway.server.to(dto.roomId).emit('receive_message', saved);

    return {
      status: 201,
      message: 'Message created successfully',
      data: saved,
    };
  }

  async sendPrivateMessage(
    senderId: string,
    recipientId: string,
    content: string,
  ) {
    const room = await this.messageHelper.getOrCreatePrivateRoom(
      senderId,
      recipientId,
    );

    const saved = await this.prisma.message.create({
      data: {
        roomId: room.id,
        senderId,
        content,
      },
      include: {
        sender: true,
      },
    });

    this.gateway.server.to(room.id).emit('receive_message', saved);

    return {
      status: 201,
      message: 'OK',
      data: saved,
    };
  }

  async getPrivateConversation(userA: string, userB: string) {
    const room = await this.messageHelper.getOrCreatePrivateRoom(userA, userB);
    return this.prisma.message.findMany({
      where: {
        roomId: room.id,
      },
      include: {
        sender: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async getMessagesByRoom(roomId: string) {
    return this.prisma.message.findMany({
      where: {
        roomId,
      },
      include: {
        sender: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async editMessage(id: string, content: string) {
    const message = await this.prisma.message.update({
      where: {
        id,
      },
      data: {
        content,
      },
    });

    return {
      status: 200,
      message: 'Message edited successfully',
      data: message,
    };
  }

  async deleteMessage(id: string) {
    const message = await this.prisma.message.delete({
      where: {
        id,
      },
    });

    return {
      status: 200,
      message: 'Message deleted successfully',
      data: message,
    };
  }
}
