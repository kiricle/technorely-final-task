import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @Auth()
  getProfile(@CurrentUser('id') userId) {
    return this.userService.getById(userId);
  }

  @UsePipes(new ValidationPipe())
  @Patch('')
  @Auth()
  updateProfile(@CurrentUser('id') userId, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(userId, dto);
  }
}
