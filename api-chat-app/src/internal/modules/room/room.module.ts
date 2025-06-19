import { Module } from '@nestjs/common';
import { RoomController } from 'src/internal/controllers/room/room.controller';
import { RoomService } from 'src/internal/services/room/room.service';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService, PrismaService],
})
export class RoomModule {}
