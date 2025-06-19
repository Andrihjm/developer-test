import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MessageController } from 'src/internal/controllers/message/message.controller';
import { ChatGateway } from 'src/internal/gateways/chat.gateway';
import { MessageService } from 'src/internal/services/message/message.service';
import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { MessageHelper } from 'src/utils/helper/message';

@Module({
  imports: [PrismaModule, PassportModule, forwardRef(() => MessageModule)],
  providers: [MessageService, ChatGateway, PrismaService, MessageHelper],
  controllers: [MessageController],
})
export class MessageModule {}
