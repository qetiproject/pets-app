import { PetEntity } from 'src/modules/pet/pet.entity';
import { ShopItemsEntity } from 'src/modules/shop_items/entities/shop_item.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity('pet_shop')
export class PetShopEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'active' })
  active: boolean;

  @OneToMany(() => PetEntity, (pets) => pets.pet_shop)
  pets?: PetEntity[];

  @ManyToMany(() => ShopItemsEntity, (shop_items) => shop_items.pet_shop)
  shop_items: ShopItemsEntity[];
}
