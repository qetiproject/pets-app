import { AccessoryEntity } from 'src/modules/accessories/entities/accessory.entity';
import { PetShopEntity } from 'src/modules/pet_shop/entities/pet_shop.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('shop_item')
export class ShopItemEntity {
  @PrimaryGeneratedColumn({ name: 'shop_id' })
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
