import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CommentEntity } from './entities/comment.entity';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: TreeRepository<UserEntity>,
    @InjectRepository(CommentEntity)
    private commentRepository: TreeRepository<CommentEntity>,
  ) {}

  async createComment(
    dto: CreateCommentDto,
    userId: number,
  ): Promise<CommentEntity> {
    const { content, parentId } = dto;

    const author = await this.userRepository.findOne({ where: { id: userId } });

    if (!author) {
      throw new NotFoundException('User not found');
    }

    const comment = new CommentEntity();
    comment.content = content;
    comment.author = author;

    if (parentId) {
      const parent = await this.commentRepository.findOne({
        where: { id: parentId },
      });
      if (!parent) {
        throw new NotFoundException('Parent comment not found');
      }
      comment.parent = parent;
    }

    return this.commentRepository.save(comment);
  }

  async getAllComments(): Promise<CommentEntity[]> {
    return this.commentRepository.findTrees();
  }
}
