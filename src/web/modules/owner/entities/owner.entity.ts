import {
  Column,
  Entity,
  PrimaryColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from '@modules/user/entities';
import { PetEntity } from '@modules/pet/entities';

@Entity('owner')
export class OwnerEntity {
  @PrimaryColumn({ name: 'username' })
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
  @JoinColumn({ name: 'owner_pets' })
  pets?: PetEntity[];

  @OneToOne(() => UserEntity, (user) => user.owner, {
    nullable: true,
  })
  user?: UserEntity;
}
