import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsBoolean,
} from 'class-validator';

import { OwnerResponseDto } from '@modules/owner/dto';
import { PetShopResponseDto } from '@modules/pet_shop/dto';
import { PetEnum, PetTypeEnum } from '../enums';

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
  @IsEnum(PetTypeEnum)
  type: PetTypeEnum;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsBoolean()
  hasGenealogicalList: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isClubMember: boolean;

  owner: OwnerResponseDto;

  @IsString()
  petShop: string;
}

export class UpdatePetRequestDto {
  name: string;
  age: number;
  animal: PetEnum;
  price: number;
  color: string;
  type: PetTypeEnum;
  hasGenealogicalList: boolean;
  isClubMember: boolean;
  owner: OwnerResponseDto;
  petShop?: PetShopResponseDto;
}
