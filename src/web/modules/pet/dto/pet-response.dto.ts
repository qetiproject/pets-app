import { IsEnum, IsNumber, IsString } from 'class-validator';

import { PetEnum } from '../enums';

export class PetResponseDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsEnum(PetEnum)
  animal: PetEnum;

  @IsNumber()
  price: number;
}
