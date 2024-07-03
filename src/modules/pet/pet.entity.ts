import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PetEnum } from './enums/pet';
import { OwnerEntity } from '../owner/owner.entity';
import { PetShopEntity } from '../pet_shop/entities/pet_shop.entity';

@Entity('pet')
export class PetEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'age' })
  age: number;

  @Column({ name: 'animal' })
  animal: PetEnum;

  @Column({ name: 'price' })
  price: number;

  @ManyToOne(() => OwnerEntity, (owner) => owner.pets)
  owner?: OwnerEntity;

  @ManyToOne(() => PetShopEntity, (petShop) => petShop.pets)
  petShop?: PetShopEntity;
}
