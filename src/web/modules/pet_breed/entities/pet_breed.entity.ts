import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { PetEntity } from '@modules/pet/entities';

@Entity('pet_breed')
export class PetBreedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id?: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description?: string;

  @OneToMany(() => PetEntity, (pets) => pets.breed)
  pets: PetEntity[];
}
