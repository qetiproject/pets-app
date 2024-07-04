import { RoleEnum } from '@common/enums';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class UserResponseDto {
  @IsString()
  username: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsEmail()
  email: string;
}
