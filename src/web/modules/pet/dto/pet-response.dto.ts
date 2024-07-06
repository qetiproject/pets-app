import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { OwnerEntity } from '@modules/owner/entities/owner.entity';
import { PetEnum } from '../enums';

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
  owner: OwnerEntity;
}
