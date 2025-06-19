import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './internal/modules/auth/auth.module';
import { PrismaModule } from './libs/prisma/prisma.module';
import { RoomModule } from './internal/modules/room/room.module';
import { MessageModule } from './internal/modules/message/message.module';

@Module({
  imports: [AuthModule, PrismaModule, RoomModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
