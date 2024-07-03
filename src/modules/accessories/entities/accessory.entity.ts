import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { ShopItemEntity } from 'src/modules/shop_items/entities/shop_item.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('accessory')
export class AccessoryEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'brand' })
  brand: string;

  @JoinTable({ name: 'accessories_categories' })
  @ManyToMany(() => CategoryEntity, (categories) => categories.accessories, {
    cascade: true,
    nullable: true,
  })
  categories: CategoryEntity[];

  @OneToMany(() => ShopItemEntity, (shopItems) => shopItems.accessoryId, {
    cascade: true,
    nullable: true,
  })
  shopItems: ShopItemEntity[];
}
