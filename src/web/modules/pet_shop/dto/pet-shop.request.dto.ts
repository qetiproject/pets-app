export class AddPetShopRequestDto {
  name: string;
}

export class UpdatePetShopRequestDto {
  name: string;
  active: boolean;
  shopItems: any[];
}
