import { IsEmail, IsEnum, IsString } from 'class-validator';

import { RoleEnum } from '@common/enums';

export class LoginResponseDto {
  @IsString()
  status: string;

  @IsString()
  accessToken: string;

  @IsString()
  username: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsEmail()
  email: string;
}
