import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: boolean;
}
