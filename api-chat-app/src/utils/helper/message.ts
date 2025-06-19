import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class MessageHelper {
  constructor(private prisma: PrismaService) {}

  async getOrCreatePrivateRoom(userA: string, userB: string) {
    const [first, second] = [userA, userB].sort();

    const existing = await this.prisma.room.findFirst({
      where: {
        isPrivate: true,
        participants: {
          every: {
            userId: { in: [first, second] },
          },
        },
      },
      include: { participants: true },
    });

    if (existing) return existing;

    return this.prisma.$transaction(async (tx) => {
      const room = await tx.room.create({
        data: { isPrivate: true },
      });

      await tx.roomParticipant.createMany({
        data: [
          { roomId: room.id, userId: first },
          { roomId: room.id, userId: second },
        ],
      });

      return room;
    });
  }
}
