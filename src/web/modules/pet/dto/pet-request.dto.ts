import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
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
  owner: OwnerResponseDto;
}
