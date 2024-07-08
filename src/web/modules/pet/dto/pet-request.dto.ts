import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

import { OwnerResponseDto } from '@modules/owner/dto';
import { PetEnum } from '../enums';

export class AddPetRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsEnum(PetEnum)
  animal: PetEnum;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class UpdatePetRequestDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsEnum(PetEnum)
  animal: PetEnum;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  owner: OwnerResponseDto;
}
