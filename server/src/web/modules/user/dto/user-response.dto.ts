import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { RoleEnum } from '@common/enums';

export class UsersResponseDto {
  @IsString()
  username: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsEmail()
  email: string;
}

export class UserResponseDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsEmail()
  email: string;
}
