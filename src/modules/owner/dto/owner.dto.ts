import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class OwnerDto {
  @ApiProperty({
    description: 'firstName',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'lastName',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'age',
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;
}
