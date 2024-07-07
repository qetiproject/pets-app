import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { PetEnum } from '../enums';
import { OwnerResponseDto } from '@modules/owner/dto';

export class PetResponseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @IsEnum(PetEnum)
  animal: PetEnum;

  @IsNotEmpty()
  price: number;

  @IsOptional()
  owner?: OwnerResponseDto;
}
