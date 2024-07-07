import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { OwnerResponseDto } from '@modules/owner/dto';
import { PetEnum } from '../enums';

export class PetResponseDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsEnum(PetEnum)
  animal: PetEnum;

  @IsNumber()
  price: number;
}

export class UpdatePetWithOwnerOrAddResponseDto {
  @IsNotEmpty()
  pet: PetResponseDto;

  @IsNotEmpty()
  owner: OwnerResponseDto;
}
