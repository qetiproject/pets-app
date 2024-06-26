import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PetEnum } from './enums/pet';
import { OwnerEntity } from '../owner/owner.entity';

@Entity('pet')
export class PetEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'age' })
  age: number;

  @Column({ name: 'animal' })
  animal: PetEnum;

  @Column({ name: 'date' })
  date: Date;

  @ManyToOne(() => OwnerEntity, (owner) => owner.pets)
  owner: OwnerEntity;
}
