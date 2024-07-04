import { RoleEnum } from '@common/enums';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class UsersResponseDto {
  @IsString()
  username: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsEmail()
  email: string;
}
