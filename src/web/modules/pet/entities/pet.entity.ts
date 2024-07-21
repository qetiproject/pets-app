import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { OwnerEntity } from '@modules/owner/entities/owner.entity';
import { PetShopEntity } from '@modules/pet_shop/entities/pet_shop.entity';
import { PetBreedEntity } from '@modules/pet_breed/entities/pet_breed.entity';
import { PetEnum, PetTypeEnum } from '../enums';

@Entity('pet')
export class PetEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id?: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'age' })
  age: number;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'color' })
  color: string;

  @Column({ name: 'type' })
  type: PetTypeEnum;

  @Column({ name: 'has_genealogical_list' })
  hasGenealogicalList: boolean;

  @Column({ name: 'animal' })
  animal: PetEnum;

  @Column({ name: 'is_club_member' })
  isClubMember: boolean;

  @JoinColumn({ name: 'breed_id' })
  @ManyToOne(() => PetBreedEntity, (breed) => breed.pets)
  breed: string;

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(() => OwnerEntity, (owner) => owner.pets)
  owner?: OwnerEntity;

  @JoinColumn({ name: 'shop_id' })
  @ManyToOne(() => PetShopEntity, (petShop) => petShop.pets)
  petShop?: string;
}
