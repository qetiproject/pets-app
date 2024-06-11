import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PetEnum } from './enums/pet';
import { OwnerEntity } from '../owner/owner.entity';

@Entity('pet')
export class PetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  animal: PetEnum;

  @ManyToOne(() => OwnerEntity, (owner) => owner.pets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ownerId' })
  owner: OwnerEntity;
}
