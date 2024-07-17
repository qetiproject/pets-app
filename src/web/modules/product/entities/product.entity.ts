import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PetShopEntity } from '@modules/pet_shop/entities/pet_shop.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id?: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'shopId' })
  shopId: string;

  @Column({ name: 'photo' })
  photo: string;

  @Column({ name: 'active' })
  active: boolean;

  @ManyToOne(() => PetShopEntity, (petShop) => petShop.products)
  petShops?: PetShopEntity[];
}
