import { IsNotEmpty } from 'class-validator';

export class PetOwnerDto {
  @IsNotEmpty()
  petId: string;

  @IsNotEmpty()
  username: string;
}
