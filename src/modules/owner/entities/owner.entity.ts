import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PetEntity } from '../pet/pet.entity';

@Entity('owner')
export class OwnerEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'firstName' })
  firstName: string;

  @Column({ name: 'lastName' })
  lastName: string;

  @Column({ name: 'age' })
  age: number;

  @OneToMany(() => PetEntity, (pet) => pet.owner, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  pets: PetEntity[];
}
