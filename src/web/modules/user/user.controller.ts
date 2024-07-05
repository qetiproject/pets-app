import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard, RoleGuard } from '@common/modules/auth/guards';
import { RoleEnum } from '@common/enums';
import { Roles } from '@common/decorators';

import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
  UserResponseDto,
  UsersResponseDto,
} from './dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  registerUser(
    @Body() registerDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.userService.registerUser(registerDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.userService.login(loginDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleEnum.ADMIN)
  @Get('/all')
  getUsers(): Promise<UsersResponseDto[]> {
    return this.userService.getUsersService();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleEnum.ADMIN)
  @Get('/:username')
  getUserByUsername(
    @Param('username') username: string,
  ): Promise<UserResponseDto> {
    return this.userService.getUserByUsernameService(username);
  }
}
