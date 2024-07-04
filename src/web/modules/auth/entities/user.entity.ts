import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { OwnerEntity } from '@modules/owner/owner.entity';
import { RoleEnum } from '@modules/shared/enums';

@Entity('user')
export class UserEntity {
  @PrimaryColumn({ name: 'username' })
  username: string;

  @Column({ name: 'role' })
  role: RoleEnum;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @OneToOne(() => OwnerEntity, (owner) => owner.user, {
    cascade: true,
    nullable: true,
  })
  owner?: OwnerEntity;
}
