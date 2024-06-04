import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PetEnum } from '../enums/pet';

export class PetDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @IsEnum(PetEnum)
  animal: PetEnum;

  @IsNumber()
  @IsNotEmpty()
  ownerId: number;
}
