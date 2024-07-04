import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { AccessoryEntity } from '@modules/accessories/entities/accessory.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: boolean;

  @ManyToMany(() => AccessoryEntity, (accessory) => accessory.categories, {
    nullable: true,
  })
  accessories: AccessoryEntity[];
}
