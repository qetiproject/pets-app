import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ unique: true, name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;
}
