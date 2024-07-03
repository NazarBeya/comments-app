import { BaseEntity } from 'src/shared/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  avatar: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
