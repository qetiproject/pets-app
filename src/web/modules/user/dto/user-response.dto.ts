import { IsEmail, IsEnum, IsString } from 'class-validator';

import { RoleEnum } from '@common/enums';

export class UsersResponseDto {
  @IsString()
  username: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsEmail()
  email: string;
}
