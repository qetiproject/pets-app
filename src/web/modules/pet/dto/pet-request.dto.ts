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
