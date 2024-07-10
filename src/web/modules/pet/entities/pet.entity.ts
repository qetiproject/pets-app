import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OwnerEntity } from '@modules/owner/entities/owner.entity';
import { PetShopEntity } from '@modules/pet_shop/entities/pet_shop.entity';
import { PetEnum } from '../enums';

@Entity('pet')
export class PetEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id?: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'age' })
  age: number;

  @Column({ name: 'animal' })
  animal: PetEnum;

  @Column({ name: 'price' })
  price: number;

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(() => OwnerEntity, (owner) => owner.pets)
  owner?: OwnerEntity;

  @JoinColumn({ name: 'shop_id' })
  @ManyToOne(() => PetShopEntity, (petShop) => petShop.pets)
  petShop?: PetShopEntity;
}