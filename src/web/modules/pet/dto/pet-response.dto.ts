import { OwnerResponseDto } from '@modules/owner/dto';
import { PetShopResponseDto } from '@modules/pet_shop/dto';
import { PetEnum } from '../enums';

export class PetResponseDto {
  name: string;
  age: number;
  price: number;
  color: string;
  type: string;
  isClubMember: boolean;
  animal: PetEnum;
  hasGenealogicalList: boolean;
  owner?: OwnerResponseDto;
  petShop?: PetShopResponseDto;
}
