import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { PetEntity } from '@modules/pet/entities/pet.entity';

@Entity('pet_shop')
export class PetShopEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id?: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'active' })
  active: boolean;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'work_hours' })
  work_hours: string;

  @OneToMany(() => PetEntity, (pets) => pets.petShop)
  pets?: PetEntity[];
}
