import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserEntity } from '@modules/user/entities';
import { PetEntity } from '@modules/pet/pet.entity';

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
