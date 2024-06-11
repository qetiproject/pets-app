import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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
    cascade: true,
    nullable: true,
  })
  owner: OwnerEntity;
}
