import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  content: string;

  parentId?: number;
}
