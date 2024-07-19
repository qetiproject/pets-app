import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pet_category')
export class PetCategoryEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;
}
