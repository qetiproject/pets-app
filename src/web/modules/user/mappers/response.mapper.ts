import { UserEntity } from '../entities';
import { LoginResponseDto, RegisterResponseDto } from '../dto';

export class ResponseMapper {
  registerResponse(registeredUser: UserEntity): RegisterResponseDto {
    return {
      email: registeredUser.email,
      role: registeredUser.role,
      status: 'OK',
      username: registeredUser.username,
    };
  }

  loginResponse(userFromDb: UserEntity, accessToken: string): LoginResponseDto {
    return {
      accessToken,
      email: userFromDb.email,
      role: userFromDb.role,
      status: 'OK',
      username: userFromDb.username,
    };
  }
}
