export class AddPetShopRequestDto {
  name: string;
  city: string;
  address: string;
  work_hours: string;
}

export class UpdatePetShopRequestDto {
  name: string;
  active: boolean;
  shopItems: any[];
}
