import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
  UsersResponseDto,
} from './dto';

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

  @Get('/all')
  getUsers(): Promise<UsersResponseDto[]> {
    return this.userService.getUsers();
  }
}
