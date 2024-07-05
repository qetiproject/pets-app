import { UserEntity } from '../entities';
import { LoginResponseDto, RegisterResponseDto, UserResponseDto } from '../dto';

export class ResponseMapper {
  registerResponse(registeredUser: UserEntity): RegisterResponseDto {
    return {
      username: registeredUser.username,
      email: registeredUser.email,
      role: registeredUser.role,
      status: 'OK',
    };
  }

  loginResponse(userFromDb: UserEntity, accessToken: string): LoginResponseDto {
    return {
      accessToken,
      username: userFromDb.username,
      email: userFromDb.email,
      role: userFromDb.role,
      status: 'OK',
    };
  }

  userResponse(userFromDb: UserEntity): UserResponseDto {
    return {
      username: userFromDb.username,
      email: userFromDb.email,
      role: userFromDb.role,
    };
  }
}
