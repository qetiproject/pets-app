import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsBoolean,
} from 'class-validator';

import { OwnerResponseDto } from '@modules/owner/dto';
import { PetShopResponseDto } from '@modules/pet_shop/dto';
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

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsBoolean()
  hasGenealogicalList: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isClubMember: boolean;

  @IsNotEmpty()
  owner: OwnerResponseDto;
}

export class UpdatePetRequestDto {
  name: string;
  age: number;
  animal: PetEnum;
  price: number;
  color: string;
  type: string;
  hasGenealogicalList: boolean;
  isClubMember: boolean;
  owner: OwnerResponseDto;
  petShop?: PetShopResponseDto;
}
