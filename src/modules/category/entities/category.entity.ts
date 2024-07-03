import { AccessoryEntity } from 'src/modules/accessories/entities/accessory.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

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
    cascade: true,
  })
  accessories: AccessoryEntity[];
}
