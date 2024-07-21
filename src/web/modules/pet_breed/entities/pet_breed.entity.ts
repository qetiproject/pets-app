import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pet_breed')
export class PetBreedEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id?: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description?: string;
}
