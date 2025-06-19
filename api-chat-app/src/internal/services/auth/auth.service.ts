import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  LoginRequestDto,
  RegisterRequestDto,
} from 'src/domain/dto/request/auth.request.dto';
import { LoginResponseDto } from 'src/domain/dto/response/auth.response.dto';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { comparePassword, hashPassword } from 'src/utils/helper/password';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterRequestDto) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const hashPass = await hashPassword(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashPass,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = newUser;

    return {
      status: 200,
      message: 'User created successfully',
      data: safeUser,
    };
  }

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const comparePass = await comparePassword(user.password, dto.password);
    if (!comparePass) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };
    const access_token = await this.jwtService.signAsync(payload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user;

    return {
      status: 200,
      message: 'User logged in successfully',
      data: {
        id: safeUser.id,
        username: safeUser.username,
        email: safeUser.email,
        createdAt: safeUser.createdAt,
      },
      access_token,
    };
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
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

    return users;
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      status: 200,
      message: 'Profile fetched successfully',
      data: user,
    };
  }

  async searchUsers(keyword: string, take = 10, excludeId?: string) {
    if (!keyword?.trim()) {
      return {
        status: 200,
        data: [],
      };
    }

    const users = await this.prisma.user.findMany({
      take,
      where: {
        AND: [
          excludeId ? { id: { not: excludeId } } : {},
          {
            OR: [
              { username: { contains: keyword, mode: 'insensitive' } },
              { email: { contains: keyword, mode: 'insensitive' } },
            ],
          },
        ],
      },
      select: { id: true, username: true, email: true },
      orderBy: { username: 'asc' },
    });

    return {
      status: 200,
      message: 'Users fetched successfully',
      data: users,
    };
  }
}
