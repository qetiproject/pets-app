import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { PetEntity } from '../pet/pet.entity';
import { UserEntity } from '@modules/user/entities';

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

  @Column({ name: 'balance' })
  balance: number;

  @OneToMany(() => PetEntity, (pet) => pet.owner, {
    cascade: true,
    nullable: true,
  })
  pets: PetEntity[];

  @OneToOne(() => UserEntity, (user) => user.owner, {
    nullable: true,
  })
  user?: UserEntity;
}
