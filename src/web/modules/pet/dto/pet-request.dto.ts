import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

import { OwnerResponseDto } from '@modules/owner/dto';
import { PetEnum } from '../enums';
import { PetShopResponseDto } from '@modules/pet_shop/dto';

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
  name: string;
  age: number;
  animal: PetEnum;
  price: number;
  owner: OwnerResponseDto;
  petShop?: PetShopResponseDto;
}
