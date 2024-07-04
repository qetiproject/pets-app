import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
  UsersResponseDto,
} from './dto';
import { AuthGuard } from '@common/modules/auth/guards/auth.guard';
import { Roles } from '@common/decorators/roles.decorator';
import { RoleGuard } from '@common/modules/auth/guards/role.guard';
import { RoleEnum } from '@common/enums';

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
    return this.userService.getUsers();
  }
}
