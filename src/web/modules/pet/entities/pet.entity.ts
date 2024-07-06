import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { OwnerEntity } from '@modules/owner/entities/owner.entity';
import { PetShopEntity } from '@modules/pet_shop/entities/pet_shop.entity';
import { PetEnum } from '../enums';

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
