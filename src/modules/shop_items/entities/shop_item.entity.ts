import { PetShopEntity } from 'src/modules/pet_shop/entities/pet_shop.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('shop_item')
export class ShopItemEntity {
  @PrimaryGeneratedColumn({ name: 'shopId' })
  shopId: string;

  @Column({ name: 'accessoryId' })
  accessoryId: string;

  @Column({ name: 'price' })
  price: boolean;

  @Column({ name: 'active' })
  active: boolean;

  @ManyToMany(() => PetShopEntity, (pet_shop) => pet_shop.shop_items)
  pet_shop: PetShopEntity[];
}
