import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';

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

export class UpdatePetWithOwnerOrAddRequestDto {
  @IsNotEmpty()
  pet: AddPetRequestDto;

  @IsNotEmpty()
  owner: OwnerResponseDto;
}
