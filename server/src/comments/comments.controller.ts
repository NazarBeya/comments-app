import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CommentsService } from './comments.service';

import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getAllComments() {
    return this.commentsService.getAllComments();
  }
}
