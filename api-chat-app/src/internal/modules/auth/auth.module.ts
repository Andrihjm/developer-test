import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/internal/controllers/auth/auth.controller';
import { AuthService } from 'src/internal/services/auth/auth.service';
import { JwtStrategy } from 'src/libs/jwt/jwt.strategy';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
