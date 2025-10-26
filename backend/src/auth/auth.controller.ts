import { Controller, Post, Body, Put, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateAuthDto,
  RefreshTokenDto,
  UpdatePasswordDto,
  UpdateProfilePasswordDto,
  UserLoginDto,
} from './dto';
import { AuthGuard } from './guards';
import { GetUser } from './decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  create(@Body() data: CreateAuthDto) {
    return this.authService.signup(data);
  }

  @Post('/signIn')
  signIn(@Body() data: UserLoginDto) {
    return this.authService.signin(data);
  }

  @UseGuards(AuthGuard)
  @Put('/updatePassword')
  updatePassword(
    @GetUser('id') userId: string,
    @Body() data: UpdatePasswordDto,
  ) {
    return this.authService.updatePassword(userId, data);
  }

  @UseGuards(AuthGuard)
  @Put('/profilePassword')
  updateProfilePassword(
    @GetUser('id') userId: string,
    @Body() data: UpdateProfilePasswordDto,
  ) {
    return this.authService.updateProfilePassword(userId, data);
  }

  @Post('refresh-token')
  refreshToken(@Body() data: RefreshTokenDto) {
    return this.authService.refreshTokens(data);
  }
}
