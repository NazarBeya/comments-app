import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CommentEntity } from './entities/comment.entity';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Server } from 'socket.io';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: TreeRepository<UserEntity>,
    @InjectRepository(CommentEntity)
    private commentRepository: TreeRepository<CommentEntity>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    userId: number,
    server: Server,
  ) {
    const { content, parentId } = createCommentDto;

    const author = await this.userRepository.findOneBy({ id: userId });

    if (!author) {
      throw new NotFoundException('User not found');
    }

    const comment = new CommentEntity();
    comment.content = content;
    comment.author = author;
    comment.parentId = parentId;

    if (parentId) {
      const parentComment = await this.commentRepository.findOneBy({
        id: parentId,
      });

      if (!parentComment) {
        throw new NotFoundException('Parent comment not found');
      }

      comment.parent = parentComment;
    }

    const newComment = await this.commentRepository.save(comment);
    server.emit('createComment', { ...newComment });
  }

  async getAllComments() {
    let comments = await this.cacheManager.get<CommentEntity[]>('all_comments');

    if (!comments) {
      comments = await this.commentRepository.findTrees({
        relations: ['author'],
      });
      await this.cacheManager.set('all_comments', comments, 60);
    }

    return comments;
  }
}
