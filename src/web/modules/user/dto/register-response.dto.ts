import { RoleEnum } from '@common/enums';
import { IsEmail, IsEnum, IsString } from 'class-validator';

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
