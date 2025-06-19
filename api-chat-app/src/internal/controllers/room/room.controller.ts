import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import {
  CreateRoomRequestDto,
  EditRoomNameRequestDto,
} from 'src/domain/dto/request/room.request.dto';
import { RoomService } from 'src/internal/services/room/room.service';
import { JwtAuthGuard } from 'src/libs/jwt/jwt-auth.guard';
import { JwtPayload } from 'src/types/jwt.type';

@UseGuards(JwtAuthGuard)
@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post()
  createRoom(
    @Body() dto: CreateRoomRequestDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.roomService.createRoom(dto, userId);
  }

  @Post('direct')
  async getOrCreateDirectRoom(
    @CurrentUser() user: JwtPayload,
    @Body() body: { targetUserId: string },
  ) {
    return this.roomService.findOrCreateDirectRoom(user.id, body.targetUserId);
  }

  @Post(':roomId/participants')
  async addParticipants(
    @Param('roomId') roomId: string,
    @Body('userIds') userIds: string[],
  ) {
    return this.roomService.addUserToRoom(roomId, userIds);
  }

  @Get(':id/messages')
  async getMessages(@Param('id') roomId: string) {
    return this.roomService.getMessagesByRoomId(roomId);
  }

  @Get('me')
  getMyRooms(@CurrentUser('id') userId: string) {
    return this.roomService.getMyRooms(userId);
  }

  @Put('edit/:id')
  async editRoomName(
    @Param('id') roomId: string,
    @Body()
    dto: EditRoomNameRequestDto,
  ) {
    return this.roomService.editRoomName(roomId, dto);
  }

  @Delete('delete/:id')
  async deleteRoom(@Param('id') roomId: string) {
    return this.roomService.deleteRooom(roomId);
  }
}
