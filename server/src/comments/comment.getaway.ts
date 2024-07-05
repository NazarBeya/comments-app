import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WebSocketAuthGuard } from 'src/auth/guards/socket.auth.guard';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { SocketCtx } from 'src/auth/decorators/socket-ctx.decorator';
import { CommentsService } from './comments.service';

@UseGuards(WebSocketAuthGuard)
@WebSocketGateway(8001, {
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class CommentGetaway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly commentsService: CommentsService) {}

  @SubscribeMessage('createComment')
  createCommet(
    @SocketCtx('userId') userId: number,
    @MessageBody() body: CreateCommentDto,
  ) {
    return this.commentsService.createComment(body, userId, this.server);
  }
}
