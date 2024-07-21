import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsBoolean,
} from 'class-validator';

import { OwnerResponseDto } from '@modules/owner/dto';
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

  owner?: OwnerResponseDto;
  petShop?: string;
  photoPath?: string;
  breed: string;
}

export class UpdatePetRequestDto {
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

  owner?: OwnerResponseDto;
  petShop?: string;
  photoPath?: string;
  breed: string;
}
