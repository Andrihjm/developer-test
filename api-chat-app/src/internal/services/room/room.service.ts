import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateRoomRequestDto,
  EditRoomNameRequestDto,
} from 'src/domain/dto/request/room.request.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async createRoom(dto: CreateRoomRequestDto, creatorId: string) {
    const participantIds = Array.from(new Set([creatorId, ...dto.userIds]));

    const room = await this.prisma.room.create({
      data: {
        name: dto.name,
        participants: {
          createMany: {
            data: participantIds.map((id) => ({ userId: id })),
          },
        },
      },
      include: {
        participants: { include: { user: true } },
      },
    });

    return room;
  }

  async getMyRooms(userId: string) {
    const rooms = await this.prisma.room.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        messages: {
          take: 1,
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return {
      status: 200,
      message: 'Rooms fetched successfully',
      data: rooms,
    };
  }

  async findOrCreateDirectRoom(userId1: string, userId2: string) {
    const [userA, userB] = [userId1, userId2].sort();

    const existingRoom = await this.prisma.room.findFirst({
      where: {
        isPrivate: true,
        participants: {
          every: {
            OR: [
              {
                userId: userA,
              },
              {
                userId: userB,
              },
            ],
          },
        },
      },
      include: {
        participants: true,
      },
    });

    if (existingRoom) return existingRoom;

    return this.prisma.room.create({
      data: {
        isPrivate: true,
        participants: {
          create: [
            {
              userId: userA,
            },
            {
              userId: userB,
            },
          ],
        },
      },
      include: {
        participants: true,
      },
    });
  }

  async getMessagesByRoomId(roomId: string) {
    return this.prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async editRoomName(roomId: string, dto: EditRoomNameRequestDto) {
    const room = await this.prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        name: dto.name,
      },
    });

    return {
      status: 200,
      message: 'Room name edited successfully',
      data: room,
    };
  }

  async deleteRooom(roomId: string) {
    await this.prisma.$transaction([
      this.prisma.message.deleteMany({
        where: {
          roomId,
        },
      }),

      this.prisma.room.delete({
        where: {
          id: roomId,
        },
      }),
    ]);

    return {
      status: 200,
      message: 'Room deleted successfully',
    };
  }

  async addUserToRoom(roomId: string, userIds: string[]) {
    const uniqueIds = Array.from(new Set(userIds));

    const userExists = await this.prisma.roomParticipant.findMany({
      where: {
        roomId,
        userId: {
          in: uniqueIds,
        },
      },
      select: {
        userId: true,
      },
    });

    const already = new Set(userExists.map((p) => p.userId));
    const newIds = uniqueIds.filter((id) => !already.has(id));

    if (!newIds.length) {
      throw new BadRequestException('All user already in room');
    }

    const newParticipant = await this.prisma.roomParticipant.createMany({
      data: newIds.map((id) => ({
        roomId,
        userId: id,
      })),
    });

    return {
      status: 200,
      message: 'User added to room',
      newParticipant,
    };
  }
}
