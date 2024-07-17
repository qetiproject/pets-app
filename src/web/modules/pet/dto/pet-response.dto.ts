import { OwnerResponseDto } from '@modules/owner/dto';
import { PetEnum } from '../enums';
import { PetShopResponseDto } from '@modules/pet_shop/dto';

export class PetResponseDto {
  name: string;
  age: number;
  animal: PetEnum;
  price: number;
  owner?: OwnerResponseDto;
  petShop?: PetShopResponseDto;
}
