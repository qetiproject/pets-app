import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PetOwnerDto {
  @ApiProperty({
    name: 'petId',
  })
  @IsNotEmpty()
  petId: string;

  @ApiProperty({
    description: 'ownerId',
  })
  @IsNotEmpty()
  ownerId: string;
}
