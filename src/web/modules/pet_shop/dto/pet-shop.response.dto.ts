import { ProductResponseDto } from '@modules/product/dto';

export class PetShopResponseDto {
  name: string;
  address: string;
  city: string;
  work_hours: string;
  active: boolean;
  products: ProductResponseDto[];
}
