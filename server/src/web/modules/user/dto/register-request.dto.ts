import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

import { RoleEnum } from '@common/enums';

export class RegisterRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}
