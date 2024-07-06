import { Column, Entity, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';

import { RoleEnum } from '@common/enums';
import { OwnerEntity } from '@modules/owner/entities/owner.entity';

@Entity('user')
export class UserEntity {
  @PrimaryColumn({ name: 'username' })
  username: string;

  @Column({ name: 'role' })
  role: RoleEnum;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @OneToOne(() => OwnerEntity, (owner) => owner.user, {
    cascade: true,
    nullable: true,
  })
  owner?: OwnerEntity;
}
