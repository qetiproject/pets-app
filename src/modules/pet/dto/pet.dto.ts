import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PetEnum } from '../enums/pet';
import { ApiProperty } from '@nestjs/swagger';

export class PetDto {
  @ApiProperty({
    name: 'name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'age',
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    description: 'animal',
  })
  @IsNotEmpty()
  @IsEnum(PetEnum)
  animal: PetEnum;

  @ApiProperty({
    description: 'ownerId',
  })
  @IsString()
  @IsNotEmpty()
  ownerId: string;
}
