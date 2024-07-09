import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { PetEntity } from '@modules/pet/entities/pet.entity';
import { ShopItemEntity } from '@modules/shop_items/entities/shop_item.entity';

@Entity('pet_shop')
export class PetShopEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id?: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'active' })
  active: boolean;

  @OneToMany(() => PetEntity, (pets) => pets.petShop)
  pets?: PetEntity[];

  @OneToMany(() => ShopItemEntity, (shopItems) => shopItems.petShop)
  shopItems: ShopItemEntity[];
}
