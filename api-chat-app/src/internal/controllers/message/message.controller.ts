import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateMessageBodyDto } from 'src/domain/dto/request/create-message.request.dto';
import {
  DeleteMessageDto,
  EditMessageDto,
} from 'src/domain/dto/request/message';
import { MessageService } from 'src/internal/services/message/message.service';
import { JwtAuthGuard } from 'src/libs/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post(':roomId')
  async createMessage(
    @Param('roomId') roomId: string,
    @Body() dto: CreateMessageBodyDto,
    @Req() req,
  ) {
    return this.messageService.createMessage({
      roomId,
      content: dto.content,
      senderId: req.user.userId,
    });
  }

  @Post('to/:recipientId')
  sendPrivate(
    @Param('recipientId') recipientId: string,
    @Body('content') content: string,
    @Req() req,
  ) {
    return this.messageService.sendPrivateMessage(
      req.user.userId,
      recipientId,
      content,
    );
  }

  @Get('dm/:userId')
  getDM(@Param('userId') otherId: string, @Req() req) {
    return this.messageService.getPrivateConversation(req.user.userId, otherId);
  }

  @Get('room/:roomId')
  async getMessagesByRoom(@Param('roomId') roomId: string) {
    return this.messageService.getMessagesByRoom(roomId);
  }

  @Put('edit')
  async editMessage(@Body() dto: EditMessageDto) {
    const { id, content } = dto;
    return this.messageService.editMessage(id, content);
  }

  @Delete('delete')
  async deleteMessage(@Body() dto: DeleteMessageDto) {
    const { id } = dto;
    return this.messageService.deleteMessage(id);
  }
}
