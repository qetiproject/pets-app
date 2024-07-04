import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterRequestDto, RegisterResponseDto } from './dto';

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

  // @Post('/login')
  // login(@Body() authCredentialsDto: any): Promise<{ accessToken: string }> {
  //   return this.userService.login(authCredentialsDto);
  // }
}
