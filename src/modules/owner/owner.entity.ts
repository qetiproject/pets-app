import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PetEntity } from '../pet/pet.entity';

@Entity('owner')
export class OwnerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @OneToMany(() => PetEntity, (pet) => pet.owner, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  pets: PetEntity[];
}
