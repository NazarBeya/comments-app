import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CommentGetaway } from './comment.getaway';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity])],
  controllers: [CommentsController],
  providers: [CommentsService, CommentGetaway],
})
export class CommentsModule {}
