import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthModule } from 'src/internal/modules/auth/auth.module';

@Global()
@Module({
  imports: [PrismaModule, AuthModule],
  providers: [PrismaService],
})
export class PrismaModule {}
