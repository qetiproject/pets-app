import { OwnerResponseDto } from '@modules/owner/dto';
import { PetEnum, PetTypeEnum } from '../enums';

export class PetResponseDto {
  id?: string;
  name: string;
  age: number;
  price: number;
  color: string;
  type: PetTypeEnum;
  isClubMember: boolean;
  animal: PetEnum;
  hasGenealogicalList: boolean;
  owner?: OwnerResponseDto;
  petShop?: string;
  breed: string;
}
