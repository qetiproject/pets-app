import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { PetEntity } from '../pet/pet.entity';
import { UserEntity } from '../user/entities';

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

  @OneToOne(() => UserEntity, (user) => user.owner, {
    nullable: true,
  })
  user?: UserEntity;
}
