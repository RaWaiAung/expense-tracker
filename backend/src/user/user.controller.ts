import {
  Controller,
  UseGuards,
  Request,
  Get,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRole } from './schemas/user.schema';
import { Roles } from './roles.decorator';
import { AuthGuard, RolesGuard } from '../auth/guards';
import { GetUser } from '../auth/decorator';
import { UpdateUserProfileDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiBearerAuth()
  // @Roles(UserRole.Admin)
  // @UseGuards(AuthGuard, RolesGuard)
  getAllUserLists() {
    return this.userService.getAllUsers();
  }

  @Delete('')
  @UseGuards(AuthGuard)
  remove(@Request() req) {
    const { _id: userId } = req.user;
    return this.userService.deleteAccountUser(userId);
  }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  me(@GetUser('id') userId: string) {
    return this.userService.me(userId);
  }

  @UseGuards(AuthGuard)
  @Put('/edit/profile')
  updateProfile(
    @GetUser('id') userId: string,
    @Body() data: UpdateUserProfileDto,
  ) {
    return this.userService.updateProfile(userId, data);
  }
}
