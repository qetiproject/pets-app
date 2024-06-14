import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class OwnerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;
}
