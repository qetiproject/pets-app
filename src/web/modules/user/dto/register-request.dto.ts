import { RoleEnum } from '@common/enums';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}
