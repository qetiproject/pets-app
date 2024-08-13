import { IsNumber, IsString } from 'class-validator';

export class OwnerResponseDto {
  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;

  @IsNumber()
  balance: number;
}
