import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PetEnum } from '../enums/pet';
import { OwnerEntity } from 'src/modules/owner/owner.entity';

export class PetDto {
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
