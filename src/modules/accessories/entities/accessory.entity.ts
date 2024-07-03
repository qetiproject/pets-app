import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { ShopItemEntity } from 'src/modules/shop_items/entities/shop_item.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('accessory')
export class AccessoryEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'categories' })
  categories: CategoryEntity[];

  @Column({ name: 'brand' })
  brand: string;

  @ManyToMany(() => ShopItemEntity, (shop_items) => shop_items.accessoryId, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  shop_items: ShopItemEntity[];
}
