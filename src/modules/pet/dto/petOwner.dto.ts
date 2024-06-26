import { IsNotEmpty, IsString } from 'class-validator';

export class PetOwnerDto {
  @IsNotEmpty()
  @IsString()
  petId: string;

  @IsNotEmpty()
  @IsString()
  username: string;
}
