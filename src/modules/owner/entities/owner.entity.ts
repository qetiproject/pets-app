import { PetEntity } from 'src/modules/pet/entities';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('owner')
export class OwnerEntity {
  @PrimaryGeneratedColumn({ name: 'username' })
  username: string;

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
