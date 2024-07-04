import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  registerUser(@Body() authCredentialsDto: any): Promise<void> {
    return this.userService.registerUser(authCredentialsDto);
  }

  @Post('/login')
  login(@Body() authCredentialsDto: any): Promise<{ accessToken: string }> {
    return this.userService.login(authCredentialsDto);
  }
}
