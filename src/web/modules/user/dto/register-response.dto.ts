import { IsEmail, IsEnum, IsString } from 'class-validator';

import { RoleEnum } from '@common/enums';

export class RegisterResponseDto {
  @IsString()
  status: string;

  @IsString()
  username: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsEmail()
  email: string;
}
