import { BaseEntity } from 'src/shared/database/entities/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity('comments')
@Tree('closure-table')
export class CommentEntity extends BaseEntity {
  @Column()
  content: string;

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(() => UserEntity)
  author: UserEntity;

  @TreeParent()
  parent: CommentEntity;

  @TreeChildren()
  children: CommentEntity[];
}
