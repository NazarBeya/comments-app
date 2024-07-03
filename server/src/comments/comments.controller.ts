import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create')
  createComment(
    @Body() dto: CreateCommentDto,
    @CurrentUser('userId') userId: number,
  ) {
    return this.commentsService.createComment(dto, userId);
  }

  @Get()
  getAllComments() {
    return this.commentsService.getAllComments();
  }
}
