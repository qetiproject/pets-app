import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { AccessoryEntity } from '@modules/accessories/entities/accessory.entity';
import { PetShopEntity } from '@modules/pet_shop/entities/pet_shop.entity';

@Entity('shop_item')
export class ShopItemEntity {
  @PrimaryColumn({ name: 'shop_id' })
  shopId: string;

  @Column({ name: 'accessory_id' })
  accessoryId: string;

  @Column({ name: 'price' })
  price: boolean;

  @Column({ name: 'active' })
  active: boolean;

  @ManyToOne(() => PetShopEntity, (petShop) => petShop.shopItems)
  petShop: PetShopEntity[];

  @ManyToOne(() => AccessoryEntity, (accessories) => accessories.shopItems)
  accessories: AccessoryEntity[];
}
