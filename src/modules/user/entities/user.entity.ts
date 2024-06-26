import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { RoleEnum } from 'src/modules/shared/enums';
import { OwnerEntity } from 'src/modules/owner/owner.entity';

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
