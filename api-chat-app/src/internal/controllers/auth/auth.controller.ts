import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import {
  LoginRequestDto,
  RegisterRequestDto,
} from 'src/domain/dto/request/auth.request.dto';
import { AuthService } from 'src/internal/services/auth/auth.service';
import { JwtAuthGuard } from 'src/libs/jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterRequestDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginRequestDto) {
    return this.authService.login(dto);
  }

  @Get('users')
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Get('user/:id')
  getUserById(@Param('id') id: string) {
    return this.authService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser('userId') userId: string) {
    return this.authService.getProfile(userId);
  }

  @Get('search/users')
  searchUser(
    @Query('q') keyword: string,
    @Query('take') take = '10',
    @Req() req,
  ) {
    const userId = req?.user?.userId;
    return this.authService.searchUsers(keyword, +take, userId);
  }
}
