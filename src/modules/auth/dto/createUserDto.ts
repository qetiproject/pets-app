import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from 'src/modules/shared/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
