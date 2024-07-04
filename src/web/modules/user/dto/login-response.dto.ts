import { RoleEnum } from '@common/enums';
import { IsEmail, IsEnum, IsString } from 'class-validator';

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
