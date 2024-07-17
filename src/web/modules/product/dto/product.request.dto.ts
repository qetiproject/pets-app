import { PetShopResponseDto } from '@modules/pet_shop/dto';

export class AddProductRequestDto {
  name: string;
  description: string;
  price: number;
  shopId: string;
  photo: string;
  active: boolean;
  petShops?: PetShopResponseDto[];
}
